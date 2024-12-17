import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { LocalStorageService } from '../local-storage.service';
import { USERNAME_LOCAL_STORAGE_KEY } from '../../constants';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    http = inject(HttpClient);
    localStorageService = inject(LocalStorageService);

    constructor() {}

    getUserSubscribedSubreddits(): Observable<any[]> {
        const username = this.localStorageService.get(
            USERNAME_LOCAL_STORAGE_KEY
        );
        return this.http.get<any[]>(
            `${environment.HOST}/user/${username}/subreddits`
        );
    }

    toggleSubredditFavorited(id: string, favorited: boolean) {}
}
