import React, { Component } from 'react';
import { Button, Table, Divider } from 'antd';
import './Home.scss';
export default class DataForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:[],
            name: '',
            pagination:{
                total:'',
                current: 1,
                pageSize: 10
            },
            columns:[
                {
                    title: '场数',
                    dataIndex: 'games',
                    align: 'center'
                },
                {
                    title: '先发',
                    align: 'center',
                    dataIndex: 'start'
                },
                {
                    title: '弹跳',
                    align: 'center',
                    dataIndex: 'bounce'
                },
                {
                    title: '分钟',
                    align: 'center',
                    dataIndex: 'minute'
                },
                {
                    title: '三分',
                    align: 'center',
                    dataIndex: 'threePointer'
                },
                {
                    title: '命中率',
                    align: 'center',
                    dataIndex: 'hitRate'
                },
                {
                    title: '进攻',
                    align: 'center',
                    dataIndex: 'attack'
                },
                {
                    title: '防守',
                    align: 'center',
                    dataIndex: 'guard'
                },
                {
                    title: '技能',
                    align: 'center',
                    dataIndex: 'skill'
                },
                {
                    title: '场均篮板',
                    align: 'center',
                    dataIndex: 'avgBackboard'
                },
                {
                    title: '场均抢断',
                    align: 'center',
                    dataIndex: 'avgSteal'
                },
                {
                    title: '场均盖帽',
                    align: 'center',
                    dataIndex: 'avgBlockShot'
                },
                {
                    title: '场均盖帽',
                    align: 'center',
                    dataIndex: 'once'
                },
                {
                    title: '失误',
                    align: 'center',
                    dataIndex: 'fault'
                },
                {
                    title: '犯规',
                    align: 'center',
                    dataIndex: 'foul'
                },
                {
                    title: '场均得分',
                    align: 'center',
                    dataIndex: 'avgScore'
                },
                {
                    title: '场均助攻',
                    align: 'center',
                    dataIndex: 'avgAssist'
                },
                // eslint-disable-next-line 
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (text, record) => (
                        <span>
                            <a>编辑</a>
                                <Divider type="vertical" />
                            <a>删除</a>
                        </span>
                    ),
                },
            ]
        };
    }
    componentWillMount(){

    }
    
    render() {
        return(
            <div id="dongFang">
                <div className="header">
                    <div>
                        <Button icon="plus" onClick={this.goAdd.bind(this, '')}>添加</Button>
                    </div>
                </div>
                <Table columns={this.state.columns} dataSource={this.state.data} pagination={this.state.pagination} onChange={this.changePages}/>
            </div>
        )
    }
}
