import React, { Component } from 'react';
import { Form, Button, message, Tabs} from 'antd';
import { withRouter } from 'react-router-dom'
import MyTable from '@/components/Table/TableModal'
import TableData from './TableData'
import { queryUnionMessage,addUnionMessage,addUnionTMessage, queryUnionsAMessage,queryUnionsBMessage, queryUnionTMessage, postUnionsAMessage, postUnionsBMessage } from '@/api'
const { TabPane } = Tabs;


class EditableTableA extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data:[], 
            data1: [],
            data2: [],
            data3: []
        }
    }
    
    
    componentDidMount(){
        
        this.getQueryMessage();
        this.getQueryTMessage()
        this.getMessageA();

        this.getMessageB()
    }
    
    postAddMessage = (params) => {
        addUnionMessage(this.state.data[0]).then(res => {
            if(res.code === 200){
                message.success('操作成功！');
            }
        })
    }
    postAddTMessage = (params) => {
        addUnionTMessage(this.state.data3[0]).then(res => {
            if(res.code === 200){
                message.success('操作成功！');
            }
        })
    }
    getQueryMessage = () =>　{
        queryUnionMessage().then(res =>　{
            console.log(res)
            if(res.code === 200){
                if(res.result){
                    let key = 'key';
                    res.result[key] = 0;
                    let arr = [];
                    arr.push(res.result)
                    this.setState({
                        data: arr
                    })
                }else{
                    let data = {
                        key: 0,
                        id: 1,
                        games: 0,
                        start: 0,
                        minute: 0,
                        hitRate: 0,
                        threePointer: 0,
                        twoPointer:0,
                        freeThrow:0,
                        allPointer:0,
                        attack: 0,
                        guard: 0,
                        avgBackboard: 0,
                        avgSteal: 0,
                        avgBlockShot: 0,
                        fault: 0,
                        foul: 0,
                        avgScore: 0,
                        avgAssist: 0
                    }
                    let arr = [];
                    arr.push(data)
                    this.setState({
                        data: arr
                    })
                }
            }
        })
    }
    getQueryTMessage = () =>　{
        queryUnionTMessage().then(res =>　{
            console.log(res)
            if(res.code === 200){
                if(res.result){
                    let key = 'key';
                    res.result[key] = 0;
                    let arr = [];
                    arr.push(res.result)
                    this.setState({
                        data3: arr
                    })
                }else{
                    let data = {
                        key: 0,
                        id: 1,
                        games: 0,
                        start: 0,
                        minute: 0,
                        hitRate: 0,
                        threePointer: 0,
                        twoPointer:0,
                        freeThrow:0,
                        allPointer:0,
                        attack: 0,
                        guard: 0,
                        avgBackboard: 0,
                        avgSteal: 0,
                        avgBlockShot: 0,
                        fault: 0,
                        foul: 0,
                        avgScore: 0,
                        avgAssist: 0
                    }
                    let arr = [];
                    arr.push(data)
                    this.setState({
                        data3: arr
                    })
                }
            }
        })
    }
    getMessageA = () => {
        queryUnionsAMessage().then(res => {
            console.log(res)
            if(res.code === 200){
                if(res.result){
                    this.setState({
                        data1: res.result
                    })
                }
            }
        })
    }

    getMessageB = () => {
        queryUnionsBMessage().then(res => {
            console.log(res)
            if(res.code === 200){
                if(res.result){
                    this.setState({
                        data2: res.result
                    })
                }
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

    postMessageA = () => {
        let params = {id: 1};
        this.state.data1.forEach((item,index) => {
            params['amount' + (index + 1)] = item['amount']
            params['area' + (index + 1)] = item['area']
            params['avgAmount' + (index + 1)] = item['avgAmount']
            params['avgArea' + (index + 1)] = item['avgArea']
            params['avgSucceed' + (index + 1)] = item['avgSucceed']
            params['succeed' + (index + 1)] = item['succeed']
        })
        postUnionsAMessage(params).then(res => {
            console.log(res)
            if(res.code === 200){
                message.success('操作成功！')
            }
        })

    }

    postMessageB = () => {
        let params = {id: 1};
        this.state.data2.forEach((item,index) => {
            params['amount' + (index + 1)] = item['amount']
            params['area' + (index + 1)] = item['area']
            params['avgAmount' + (index + 1)] = item['avgAmount']
            params['avgArea' + (index + 1)] = item['avgArea']
            params['avgSucceed' + (index + 1)] = item['avgSucceed']
            params['succeed' + (index + 1)] = item['succeed']
        })
        postUnionsBMessage(params).then(res => {
            console.log(res)
            if(res.code === 200){
                message.success('操作成功！')
            }
        })

    }
    setMyDataA = (data) => {
        this.setState({
            data: data
        })
    }

    setMyDataB = (data) => {
        this.setState({
            data3: data
        })
    }

    render() {


        return (
            <div>
                <div>
                    <h2>联盟平均数据</h2>
                    <TableData data={this.state.data} setMyData={this.setMyDataA} />
                    <div style={{padding: '20px 0',textAlign: 'right'}}>
                        <Button type="primary" onClick={this.postAddMessage}>提交</Button>
                    </div>
                </div>
                <div>
                    <h2>联盟总计数据</h2>
                    <TableData data={this.state.data3} setMyData={this.setMyDataB} />
                    <div style={{padding: '20px 0',textAlign: 'right'}}>
                        <Button type="primary" onClick={this.postAddTMessage}>提交</Button>
                    </div>
                </div>
                <div>
                    <h2>联盟投篮表现</h2>
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
            </div>
            
        );
    }
}
const UnionData = Form.create()(EditableTableA);
export default withRouter(UnionData)