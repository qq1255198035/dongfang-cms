import React, { Component } from 'react';
import { Form, Button, message} from 'antd';
import { withRouter } from 'react-router-dom'
import { queryMessage,addMessage, queryTotalMessage, addTotalMessage } from '@/api'
import TableData from './TableData'

class EditableTableB extends Component {
    constructor(props) {
        super(props);
        this.state = { data:[],data2:[] };
    }
    
    
    componentDidMount(){
        console.log(this.props.match.params.id)
        if(this.props.match.params.id){
            this.getQueryMessage(this.props.match.params.id)
            this.getQueryTMessage(this.props.match.params.id)
        }
        
    }
    postAddMessage = (params) => {
        addMessage(this.state.data[0]).then(res => {
            console.log(res)
            if(res.code === 200){
                message.success('操作成功！');
            }
        })
    }
    postAddTMessage = (params) => {
        addTotalMessage(this.state.data2[0]).then(res => {
            console.log(res)
            if(res.code === 200){
                message.success('操作成功！');
            }
        })
    }
    getQueryMessage = (id) =>　{
        queryMessage(id).then(res =>　{
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
                        playerId: id,
                        games: 0,
                        start: 0,
                        minute: 0,
                        hitRate: 0,
                        threePointer: 0,
                        twoPointer:0,
                        allPointer:0,
                        freeThrow:0,
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
    getQueryTMessage = (id) =>　{
        queryTotalMessage(id).then(res =>　{
            console.log(res)
            if(res.code === 200){
                if(res.result){
                    let key = 'key';
                    res.result[key] = 0;
                    let arr = [];
                    arr.push(res.result)
                    this.setState({
                        data2: arr
                    })
                }else{
                    let data = {
                        key: 0,
                        playerId: id,
                        games: 0,
                        start: 0,
                        minute: 0,
                        hitRate: 0,
                        threePointer: 0,
                        twoPointer:0,
                        allPointer:0,
                        freeThrow:0,
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
                        data2: arr
                    })
                }
                
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
            data2: data
        })
    }
    render() {
        

        return (
            <div>
                <div>
                    <h2>个人平均数据</h2>
                    <TableData data={this.state.data} setMyData={this.setMyDataA} />
                    <div style={{padding: '20px 0',textAlign: 'right'}}>
                        <Button type="primary" onClick={this.postAddMessage}>提交</Button>
                    </div>
                </div>
                <div>
                <h2>个人总计数据</h2>
                    <TableData data={this.state.data2} setMyData={this.setMyDataB} />
                    <div style={{padding: '20px 0',textAlign: 'right'}}>
                        <Button type="primary" onClick={this.postAddTMessage}>提交</Button>
                    </div>
                </div>
            </div>
            
        );
    }
}
const EditableFormTableB = Form.create()(EditableTableB);
export default withRouter(EditableFormTableB)