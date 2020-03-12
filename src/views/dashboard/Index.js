import React, { Component } from 'react';
import { Button, Table, Input, Form, Avatar, message, Menu, Dropdown, Icon} from 'antd';
import { withRouter } from 'react-router-dom'
import { queryPageList,deleteItem } from '@/api'
import './Home.scss';
const Item = Form.Item


class Home extends Component{
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
                    title: '姓名',
                    dataIndex: 'name',
                    align: 'center'
                },
                {
                    title: '头像',
                    align: 'center',
                    dataIndex: 'pic',
                    render: (text, record) => (
                        <Avatar src={text} shape="square" />
                    ),
                },
                {
                    title: '弹跳',
                    align: 'center',
                    dataIndex: 'bounce'
                },
                {
                    title: '体重',
                    align: 'center',
                    dataIndex: 'weight'
                },
                {
                    title: '生日',
                    align: 'center',
                    dataIndex: 'birth'
                },
                {
                    title: '经历',
                    align: 'center',
                    dataIndex: 'experience'
                },
                {
                    title: '进攻',
                    align: 'center',
                    dataIndex: 'attack'
                },
                {
                    title: '选秀',
                    align: 'center',
                    dataIndex: 'draft'
                },
                {
                    title: '技能',
                    align: 'center',
                    dataIndex: 'skill'
                },
                {
                    title: '身高',
                    align: 'center',
                    dataIndex: 'stature'
                },
                {
                    title: '体力',
                    align: 'center',
                    dataIndex: 'power'
                },
                {
                    title: '敏捷',
                    align: 'center',
                    dataIndex: 'agility'
                },
                {
                    title: '加入东方之前',
                    align: 'center',
                    dataIndex: 'once'
                },
                // eslint-disable-next-line 
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (text, record) => (
                        <Dropdown overlay={this.renderMenu.bind(this,text.id)} placement="bottomCenter">
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                操作<Icon type="down" />
                            </a>
                        </Dropdown>
                    ),
                },
            ]
        };
    }
    componentDidMount(){
        this.getData('',1)
    }
    
    getData = (name,pageNo) => {
        queryPageList(name,pageNo).then(res => {
            console.log(res)
            let key = 'key';
            res.records.map((item,index) => item[key] = index)
            const pagination = Object.assign({}, this.state.pagination, { total: res.total })
            this.setState({
                data: res.records,
                pagination: pagination
            })
        })
    }
    changePages = (pagination) => {
        console.log(pagination)
        this.getData(this.state.name,pagination.current);
        this.setState({
            pagination: pagination
        })
    }

  
    showModal = (id) => {
        this.props.history.push({pathname:"/data/" + id});
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values.note)
            this.getData(values.note,1)
            this.setState({
                name: values.note
            })
        });
    }
    postDelete = (id) => {
        deleteItem(id).then(res => {
            console.log(res)
            if(res.code === 200){
                message.success('操作成功！');
                this.getData(this.state.name,this.state.pagination.current)
            }
        })
    }
    renderMenu = (id) => {
        return (
                <Menu>
                    <Menu.Item>
                        <a onClick={this.goAdd.bind(this,id)} rel="noopener noreferrer">编辑</a> 
                    </Menu.Item>
                    <Menu.Item>
                        <a onClick={this.postDelete.bind(this,id)} rel="noopener noreferrer">删除</a>
                    </Menu.Item>
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={this.showModal.bind(this,id)}>个人数据</a>
                    </Menu.Item>
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={this.checkPoints.bind(this,id)}>投篮表现</a>
                    </Menu.Item>
                </Menu>
            );
    }
    checkPoints = (id) => {
        this.props.history.push({pathname:"/points/" + id});
    }
    goAdd = (id) =>　{
        this.props.history.push({pathname:"/add/" + id});
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div id="Home">
                <div className="header">
                    <Form style={{display: 'flex',width: '80%'}} onSubmit={this.handleSubmit}>
                        <Item style={{width: '40%'}}>
                            {getFieldDecorator('note', {rules: [
                            { required: false}],
                            })(<Input placeholder="请输入姓名"/>)}
                        </Item>
                        <Item style={{marginLeft: '10px'}}>
                            <Button type="primary" htmlType="submit">
                                搜索
                            </Button>
                        </Item>
                    </Form>
                    <div>
                        <Button icon="plus" onClick={this.goAdd.bind(this, '')}>添加</Button>
                    </div>
                </div>
                <Table columns={this.state.columns} dataSource={this.state.data} pagination={this.state.pagination} onChange={this.changePages}/>
            </div>
        )
    }
}
const WrappedApp = Form.create()(Home);

export default withRouter(WrappedApp);
