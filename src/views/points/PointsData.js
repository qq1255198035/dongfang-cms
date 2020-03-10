import React, { Component } from 'react';
import { Tabs, Button, message } from 'antd';
import { withRouter } from 'react-router-dom'
import TableData from './TableData'
import { queryPointsAMessage, queryPointsBMessage, postPointsAMessage, postPointsBMessage } from '@/api'
const { TabPane } = Tabs;

class PointsData extends Component{
    constructor(props){
        super(props)
        this.state = {
            data1:[],
            data2: []
        }
    }

    componentDidMount(){
        if(this.props.match.params.id){
            this.getMessageA(this.props.match.params.id)
            this.getMessageB(this.props.match.params.id)
        }
    }

    getMessageA = (id) => {
        queryPointsAMessage(id).then(res => {
            console.log(res)
            if(res.code === 200){
                if(res.result){
                    let key = 'key';
                    res.result[key] = 1;
                    let arr = [];
                    arr.push(res.result)
                    this.setState({
                        data1: arr
                    })
                }else{
                    let data = {
                        key: 1,
                        playerId: id,
                        id:　id,
                        area1: 0,
                        amount1: 0,
                        succeed1: 0,
                        avgArea1: 0,
                        avgAmount1: 0,
                        avgSucceed1: 0,
                        area2: 0,
                        amount2: 0,
                        succeed2: 0,
                        avgArea2: 0,
                    }
                    let arr = [];
                    arr.push(data)
                    this.setState({
                        data1: arr
                    })
                }
            }
        })
    }

    getMessageB = (id) => {
        queryPointsBMessage(id).then(res => {
            console.log(res)
            if(res.code === 200){
                if(res.result){
                    let key = 'key';
                    res.result[key] = 2;
                    let arr = [];
                    arr.push(res.result)
                    this.setState({
                        data2: arr
                    })
                }else{
                    let data = {
                        key: 2,
                        playerId: id,
                        id:　id,
                        area1: 0,
                        amount1: 0,
                        succeed1: 0,
                        avgArea1: 0,
                        avgAmount1: 0,
                        avgSucceed1: 0,
                        area2: 0,
                        amount2: 0,
                        succeed2: 0,
                        avgArea2: 0,
                    }
                    let arr = [];
                    arr.push(data)
                    this.setState({
                        data2: arr
                    })
                }
            }
        })
    }

    postMessageA = () => {
        postPointsAMessage(this.state.data1[0]).then(res => {
            console.log(res)
            if(res.code === 200){
                message.success('操作成功！')
            }
        })

    }


    postMessageB = () => {
        postPointsBMessage(this.state.data2[0]).then(res => {
            console.log(res)
            if(res.code === 200){
                message.success('操作成功！')
            }
        })

    }

    setDataA = (data) =>　{
        this.setState({
            data1: data
        })
    }

    setDataB = (data) =>　{
        this.setState({
            data2: data
        })
    }

    

    render(){
        return(
            <div id="PointsData">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="季前赛" key="1">
                        <TableData data={this.state.data1} setData={this.setDataA} />
                        <div style={{padding: '20px 0',textAlign: 'right'}}>
                            <Button type="primary" onClick={this.postMessageA}>提交</Button>
                        </div>
                    </TabPane>
                    <TabPane tab="常规赛" key="2">
                        <TableData data={this.state.data2} setData={this.setDataB} />
                        <div style={{padding: '20px 0',textAlign: 'right'}}>
                            <Button type="primary" onClick={this.postMessageB}>提交</Button>
                        </div>
                    </TabPane>
                </Tabs>
                <div style={{display: 'flex',justifyContent: 'center',paddingTop: '50px'}}>
                    <img src={require('@/assets/img/img-1.png')} alt="" />
                </div>
            </div>
        )
    }
    
}
export default withRouter(PointsData)
