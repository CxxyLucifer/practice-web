/**
 * Created by liuhui on 2017/12/06.
 */
'use strict'
import { Store, IOptions, msg } from 'plume2';
import DecoreActor from './actor/decore-actor';

const myStorage: any = window.localStorage;

export default class AppStore extends Store {
    constructor(props: IOptions) {
        super(props);
        if (__DEV__) {
            window['_store'] = this;
        }
    }

    bindActor() {
        return [
            new DecoreActor()
        ];
    }

    setData = (name: String, value: Object) => {
        this.dispatch('decoreActor:setData', { name, value });
    }

    updateCache = (key: string, value: any) => {
        myStorage.setItem(key, value);
    }

    getCache = (key: string) => {
        return myStorage.getItem(key);
    }
}