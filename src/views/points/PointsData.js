import React, { Component } from 'react';
import { Tabs, Button, message } from 'antd';
import { withRouter } from 'react-router-dom'
import { queryPointsAMessage, queryPointsBMessage, postPointsAMessage, postPointsBMessage } from '@/api'
import MyTable from '@/components/Table/TableModal'
const { TabPane } = Tabs;
const obj = [
    {
        key:1,
        amount: 0,
        area: 0,
        avgAmount: 0,
        avgArea: 0,
        avgSucceed: 0,
        succeed: 0
    },
    {
        key:2,
        amount: 0,
        area: 0,
        avgAmount: 0,
        avgArea: 0,
        avgSucceed: 0,
        succeed: 0
    },
    {
        key:3,
        amount: 0,
        area: 0,
        avgAmount: 0,
        avgArea: 0,
        avgSucceed: 0,
        succeed: 0
    },
    {
        key:4,
        amount: 0,
        area: 0,
        avgAmount: 0,
        avgArea: 0,
        avgSucceed: 0,
        succeed: 0
    },
    {
        key:5,
        amount: 0,
        area: 0,
        avgAmount: 0,
        avgArea: 0,
        avgSucceed: 0,
        succeed: 0
    },
    {
        key:6,
        amount: 0,
        area: 0,
        avgAmount: 0,
        avgArea: 0,
        avgSucceed: 0,
        succeed: 0
    },
    {
        key:7,
        amount: 0,
        area: 0,
        avgAmount: 0,
        avgArea: 0,
        avgSucceed: 0,
        succeed: 0
    },
    {
        key:8,
        amount: 0,
        area: 0,
        avgAmount: 0,
        avgArea: 0,
        avgSucceed: 0,
        succeed: 0
    },
    {
        key:9,
        amount: 0,
        area: 0,
        avgAmount: 0,
        avgArea: 0,
        avgSucceed: 0,
        succeed: 0
    },
    {
        key:10,
        amount: 0,
        area: 0,
        avgAmount: 0,
        avgArea: 0,
        avgSucceed: 0,
        succeed: 0
    },
]
class PointsData extends Component{
    constructor(props){
        super(props)
        this.state = {
            data1: [],
            data2: [],
            id1: '',
            id2: ''
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
                    this.setState({
                        id1: res.result.id,
                        data1: res.result.list
                    })
                }else{
                    this.setState({
                        id1: '',
                        data1: obj
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
                    this.setState({
                        id2: res.result.id,
                        data2: res.result.list
                    })
                }else{
                    this.setState({
                        id2: '',
                        data2: obj
                    })
                }
            }
        })
    }

    postMessageA = () => {
        let params = {playerId: this.props.match.params.id,id: this.state.id1};
        this.state.data1.forEach((item,index) => {
            params['amount' + (index + 1)] = item['amount']
            params['area' + (index + 1)] = item['area']
            params['avgAmount' + (index + 1)] = item['avgAmount']
            params['avgArea' + (index + 1)] = item['avgArea']
            params['avgSucceed' + (index + 1)] = item['avgSucceed']
            params['succeed' + (index + 1)] = item['succeed']
        })
        postPointsAMessage(params).then(res => {
            console.log(res)
            if(res.code === 200){
                message.success('操作成功！')
                this.getMessageA(this.props.match.params.id)
            }
        })

    }


    postMessageB = () => {
        let params = {playerId: this.props.match.params.id,id: this.state.id2};
        this.state.data2.forEach((item,index) => {
            params['amount' + (index + 1)] = item['amount']
            params['area' + (index + 1)] = item['area']
            params['avgAmount' + (index + 1)] = item['avgAmount']
            params['avgArea' + (index + 1)] = item['avgArea']
            params['avgSucceed' + (index + 1)] = item['avgSucceed']
            params['succeed' + (index + 1)] = item['succeed']
        })
        postPointsBMessage(params).then(res => {
            console.log(res)
            if(res.code === 200){
                message.success('操作成功！')
                this.getMessageB(this.props.match.params.id)
            }
        })

    }
    setDataA = (params) => {
        let arr = [...this.state.data1];
        arr = arr.map(item => item.key === params.key ? params : item)
        this.setState({
            data1: arr
        })
    }

    setDataB = (params) => {
        let arr = [...this.state.data2];
        arr = arr.map(item => item.key === params.key ? params : item)
        this.setState({
            data2: arr
        })
    }

    render(){
        return(
            <div id="PointsData">
                <div style={{display: 'flex',justifyContent: 'center',paddingTop: '50px'}}>
                    <img src={require('@/assets/img/img-1.png')} alt="" />
                </div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="常规赛" key="1">
                        
                        <MyTable data={this.state.data1} tab={1} setData={this.setDataA} />
                        <div style={{padding: '20px 0',textAlign: 'right'}}>
                            <Button type="primary" onClick={this.postMessageA}>提交</Button>
                        </div>
                    </TabPane>
                    <TabPane tab="季前赛" key="2">
    
                        <MyTable data={this.state.data2} tab={2} setData={this.setDataB} />
                        <div style={{padding: '20px 0',textAlign: 'right'}}>
                            <Button type="primary" onClick={this.postMessageB}>提交</Button>
                        </div>
                    </TabPane>
                </Tabs>
                
                
            </div>
        )
    }
    
}
export default withRouter(PointsData)
