import React, { Component } from 'react';
import { Form,Input,Upload, Button, Icon,Row, Col, InputNumber,DatePicker,message } from 'antd';
import { sourceUpload,addItem,queryById } from '@/api'
import { withRouter } from 'react-router-dom'
import moment from "moment"
const Item = Form.Item
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
    },
};
class AddItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            isToggleOn: true,
            id: '',
            data:[],
            name: '',
            pagination:{
                total:'',
                current: 1,
                pageSize: 10
            },
            obj: '',
            mtl: '',
            img: ''
        };
    }
    componentDidMount(){
        this.setState({
            id: this.props.match.params.id
        })
        console.log(this.props.match.params.id)
        if(this.props.match.params.id){
            this.getQueryById(this.props.match.params.id)
        }
    }
    getQueryById = (id) =>　{
        queryById(id).then(res => {
            console.log(res)
            if(res.code === 200){
                this.props.form.setFieldsValue({
                    name: res.result.name,
                    once: res.result.once,
                    bounce:　res.result.bounce,
                    weight: res.result.weight,
                    birth: res.result.birth ? moment(res.result.birth,'YYYY-MM-DD') : null,
                    experience: res.result.experience,
                    attack: res.result.attack,
                    draft: res.result.draft,
                    skill:  res.result.skill,
                    stature: res.result.stature,
                    power: res.result.power,
                    agility: res.result.agility,
                })
                this.setState({
                    id: res.result.id,
                    pic: res.result.img,
                    obj: res.result.obj,
                    mtl: res.result.mtl,
                    img: res.result.pic
                })
            }
        })
    }
    uploadObj = (file) => {
        console.log(file)
        let files = file.file;
        let formData = new FormData();
        formData.append("file", files);
        sourceUpload(formData).then(res => {
            this.setState({
                obj: res
            })
        })
    }
    uploadMtl = (file) => {
        console.log(file)
        let files = file.file;
        let formData = new FormData();
        formData.append("file", files);
        sourceUpload(formData).then(res => {
            this.setState({
                mtl: res
            })
        })
    }
    uploadImg = (file) => {
        console.log(file)
        let files = file.file;
        let formData = new FormData();
        formData.append("file", files);
        sourceUpload(formData).then(res => {
            console.log(res)
            this.setState({
                img: res
            })
        })
    }
    postAddItem = () => {
        console.log(this.state.id)
        this.props.form.validateFields((err, values) => {
            let params = {
                id: this.state.id,
                once: values.once,
                bounce:　values.bounce,
                weight: values.weight,
                birth: values.birth,
                experience: values.experience,
                attack: values.attack,
                draft: values.draft,
                skill:  values.skill,
                stature: values.stature,
                power: values.power,
                agility: values.agility,
                pic: this.state.img,
                obj: this.state.obj,
                mtl: this.state.mtl,
                name: values.name
            }
            addItem(params).then(res => {
                console.log(res)
                if(res.code === 200){
                    message.success('操作成功！');
                }
            })
        });
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const { img } = this.state;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传头像</div>
            </div>
        );
        return(
            <div id="addItem">
                <Form {...formItemLayout}>
                    <Row>
                        <Col span={12}>
                            <Item label="姓名">
                                {getFieldDecorator('name', {rules: [
                                { required: false}],
                                })(<Input placeholder="请输入姓名"/>)}
                            </Item>
                            <Item label="弹跳">
                                {getFieldDecorator('bounce', {rules: [
                                { required: false}],
                                })(<InputNumber max="100" />)}
                            </Item>
                            <Item label="体重">
                                {getFieldDecorator('weight', {rules: [
                                { required: false}],
                                })(<InputNumber />)}
                            </Item>
                            <Item label="加入东方之前">
                                {getFieldDecorator('once', {rules: [
                                { required: false}],
                                })(<Input />)}
                            </Item>
                            <Item label="生日">
                                {getFieldDecorator('birth', {rules: [
                                { required: false}],
                                })(<DatePicker placeholder="选择日期"/>)}
                            </Item>
                            <Item label="经历">
                                {getFieldDecorator('experience', {rules: [
                                { required: false}],
                                })(<Input />)}
                            </Item>
                            <Item label="进攻">
                                {getFieldDecorator('attack', {rules: [
                                { required: false}],
                                })(<InputNumber max="100" />)}
                            </Item>
                            <Item label="选秀">
                                {getFieldDecorator('draft', {rules: [
                                { required: false}],
                                })(<Input />)}
                            </Item>
                            <Item label="技能">
                                {getFieldDecorator('skill', {rules: [
                                { required: false}],
                                })(<InputNumber max="100" />)}
                            </Item>
                            <Item label="身高">
                                {getFieldDecorator('stature', {rules: [
                                { required: false}],
                                })(<InputNumber />)}
                            </Item>
                            <Item label="体力">
                                {getFieldDecorator('power', {rules: [
                                { required: false}],
                                })(<InputNumber max="100" />)}
                            </Item>
                            <Item label="敏捷">
                                {getFieldDecorator('agility', {rules: [
                                { required: false}],
                                })(<InputNumber max="100" />)}
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label="上传Obj">
                                <Upload customRequest={this.uploadObj} showUploadList={false}>
                                    <Button>
                                        <Icon type="upload" /> 点击上传
                                    </Button>
                                </Upload>
                                <p style={{whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis',margin: 0,color: '#1890FF'}} title={this.state.obj}>{this.state.obj}</p>
                            </Item>
                            <Item label="上传Mtl">
                                <Upload customRequest={this.uploadMtl} showUploadList={false}>
                                    <Button>
                                        <Icon type="upload" /> 点击上传
                                    </Button>
                                </Upload>
                                <p style={{whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis',margin: 0,color: '#1890FF'}} title={this.state.mtl}>{this.state.mtl}</p>
                            </Item>
                            <Item label="上传头像">
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    customRequest={this.uploadImg}
                                    showUploadList={false}
                                >
                                    {img ? <img src={img} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </Item>
                            <Item style={{textAlign: 'center'}}>
                                <Button type="primary" onClick={this.postAddItem}>提交</Button>
                            </Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
const addItemForm = Form.create()(AddItem);
export default withRouter(addItemForm);