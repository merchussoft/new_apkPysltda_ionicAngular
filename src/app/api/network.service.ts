import {Injectable} from '@angular/core';
import {Network} from '@ionic-native/network/ngx';
import {BehaviorSubject, Observable} from 'rxjs';
import {ToastController, Platform} from '@ionic/angular';

export enum ConnectionStatus {
    Online,
    Offline
}

@Injectable({
    providedIn: 'root'
})
export class NetworkService {

    private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);

    constructor(
        private network: Network,
        private toastController: ToastController,
        private plt: Platform
    ) {
        this.plt.ready().then(() => {
            this.initializeNetworkEvents();
        });
    }

    initializeNetworkEvents() {
        this.network.onDisconnect().subscribe(() => {
            if (this.status.getValue() === ConnectionStatus.Online) {
                console.log('Estamos fuera de línea');
                this.updateNetworkStatus(ConnectionStatus.Offline);
            }
        });

        this.network.onConnect().subscribe(() => {
            if (this.status.getValue() === ConnectionStatus.Offline) {
                console.log('Estamos en línea');
                this.updateNetworkStatus(ConnectionStatus.Online);
            }
        });
    }

    private async updateNetworkStatus(status: ConnectionStatus) {
        this.status.next(status);

        const connection = status === ConnectionStatus.Offline ? 'Offline' : 'Online';
        const toast = this.toastController.create({
            message: `You are now ${connection}`,
            duration: 3000,
            position: 'bottom'
        });
        toast.then(toast => toast.present());
    }

    public onNetworkChange(): Observable<ConnectionStatus> {
        return this.status.asObservable();
    }

    public getCurrentNetworkStatus(): ConnectionStatus {
        return this.status.getValue();
    }

}
