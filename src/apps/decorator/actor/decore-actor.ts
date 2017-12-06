/**
 * Created by liuhui on 2017/12/6.
 */
import { Actor, Action, IMap } from 'plume2';

export default class DecoreActor extends Actor {
    defaultState() {
        return {
            data: {
                memuName: '用户管理',
                subMenuKey: 'user',
                menuKey: 'userlist'
            }
        }
    }

    @Action('decoreActor:setData')
    setData(state: IMap, { name, value }: { name: String, value: Object }) {
        return state.setIn(['data', name], value);
    }
} 