import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {ErrorService} from "./service/error.service";
import {DataStoreService} from "./service/data-store.service";
import {ErrorDisplayComponent} from "./shared/error-display/error-display.component";
import {VkApiService} from "./service/vk-api.service";
import {JSONP_PROVIDERS} from "angular2/http";

@Component({
  moduleId: __moduleName,
  selector: 'vk-post-commentators-app',
  providers: [ROUTER_PROVIDERS, JSONP_PROVIDERS, ErrorService, DataStoreService, VkApiService],
  templateUrl: 'vk-post-commentators.component.html',
  styleUrls: ['vk-post-commentators.component.css'],
  directives: [ROUTER_DIRECTIVES, ErrorDisplayComponent],
  pipes: []
})
@RouteConfig([
])
export class VkPostCommentatorsApp {
  public comments: any[] = [];
  public users: any = {};
  public commentsCount = 0;

  public loading = false;
  public currentPage = 0;
  public allPage = 0;

  public sorted = 'stickers';

  public topComments = [];

  constructor(private api: VkApiService) { }

  ngOnInit() {
    setInterval(() => console.log('comments', this.comments.length), 5000)
  }

  sortBy(field) {
    this.sorted = field;
    let arrUsers = [];
    Object.keys(this.users).forEach(uid => {
      arrUsers.push(this.users[uid]);
    });
    arrUsers.sort((a, b) => {
      if (a[this.sorted] < b[this.sorted]) {
        return 1;
      }

      if (a[this.sorted] > b[this.sorted]) {
        return -1;
      }
      // a должно быть равным b
      return 0;
    });
    this.topComments = arrUsers.slice(0, 100);
  }

  commentsLoaded() {
    this.loading = false;
    let usersHashStats = {};
    this.comments.forEach((c: any) => {
      let hasSticker = false;
      if (c.attachments && c.attachments.filter(cm => cm.type == 'sticker').length) {
        hasSticker = true;
      }

      if (!usersHashStats[c.from_id]) {
        usersHashStats[c.from_id] = {
          count: 0,
          stickers: 0,
          likes: 0,
          items: [],
          uid: c.from_id
        }
      }

      if (hasSticker) {
        usersHashStats[c.from_id].stickers ++;
      }
      usersHashStats[c.from_id].count ++;
      usersHashStats[c.from_id].likes += c.likes.count;
      usersHashStats[c.from_id].items.push(c);
    });
    this.users = usersHashStats;
    this.sortBy(this.sorted);
  }

  getCommentsPage(owner_id, post_id, page=1) {
    this.currentPage = page;
    return this.api.method('wall.getComments', {
      owner_id: owner_id,
      post_id: post_id,
      need_likes: true,
      sort: 'asc',
      offset: page * 100 - 100,
      count: 100
    });
  }

  loadCommentsRecursion(owner_id, post_id, page) {
    this.getCommentsPage(owner_id, post_id, page)
        .subscribe(rs => {
          // if (page > 40) {
          //   this.commentsLoaded()
          //   return ;
          // }


          if (rs.error && rs.error.error_code == 6) {
            setTimeout(() => {
              console.log('retry');
              this.loadCommentsRecursion(owner_id, post_id, page);
            }, 1000);
            return ;
          }
          this.comments = this.comments.concat(rs.response.items);
          console.log('page', page, rs.response.count);

          if (rs.response.count > ((page * 100) - 100)) {
            setTimeout(() => {
              this.loadCommentsRecursion(owner_id, post_id, ++page);
            }, 30);


          } else {
            console.log('--end--', rs.response.count, ((page * 100) - 100), (rs.response.count < ((page * 100) - 100)));

            this.commentsLoaded()
          }
        });
  }

  loadComments(owner_id, post_id) {
    this.getCommentsPage(owner_id, post_id)
        .subscribe(rs => {
          this.commentsCount = rs.response.count;
          this.comments = rs.response.items;
          this.allPage = Math.ceil(this.commentsCount / 100);
          this.loadCommentsRecursion(owner_id, post_id, 2)
        })
  }

  check(val: string) {
    let mch = val.match(/wall(-?\d+)_(\d+)/);
    if (mch) {
      let owner_id = mch[1];
      let post_id = mch[2];
      this.loadComments(owner_id, post_id);
      this.loading = true;
    }
    return false;
  }
}
