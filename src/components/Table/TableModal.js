import React from 'react';
import { Table, Modal, Form, Row, Col, InputNumber } from 'antd';

class MyTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            key: 0
        }
        this.columns = [
            {
                title: '区域',
                key: 1,
                render: (text, record) => {
                    return (
                    <span>
                        {record.key}
                    </span>
                    ) 
                    },
            },
            {
                title: '赛季表现',
                key: 2,
                editable: true,
                children:[
                    {
                        title: '命中率',
                        dataIndex: 'amount',
                        key: 'amount',
                        editable: true
                    },
                    {
                        title: '命中',
                        dataIndex: 'area',
                        key: 'area',
                        editable: true
                    },
                    {
                        title: '投篮',
                        dataIndex: 'avgAmount',
                        key: 'avgAmount',
                        editable: true
                    }
                ]
            },
            {
                title: '近5场表现',
                editable: true,
                key: 3,
                children:[
                    {
                        title: '命中率',
                        dataIndex: 'avgArea',
                        key: 'avgArea',
                        editable: true
                    },
                    {
                        title: '命中',
                        dataIndex: 'avgSucceed',
                        key: 'avgSucceed',
                        editable: true
                    },
                    {
                        title: '投篮',
                        dataIndex: 'succeed',
                        key: 'succeed',
                        editable: true
                    }
                ]
            },
            {
                title: '操作',
                key: 4,
                render: (text, record) => {
                    return (
                        <a onClick={this.openModal.bind(this,record)}>
                            编辑
                        </a>
                    );
                },
            },
        ];
    }
    openModal = (record) => {
        console.log(record)
        this.setState({
            visible:　true,
            key: record.key
        })
        this.props.form.setFieldsValue({
            amount: record.amount ? record.amount : 0,
            area: record.area ? record.area : 0,
            avgAmount: record.avgAmount ? record.avgAmount : 0,
            avgArea: record.avgArea ? record.avgArea : 0,
            avgSucceed: record.avgSucceed ? record.avgSucceed : 0,
            succeed: record.succeed ? record.succeed : 0
        })
    }
    handleOk = e => {
        console.log(e);
        this.props.form.validateFields((err, values) => {
            if(!err){
                this.setState({
                    visible: false
                });
                let params = {
                    key: this.state.key,
                    amount: values.amount,
                    area: values.area,
                    avgAmount: values.avgAmount,
                    avgArea: values.avgArea,
                    avgSucceed: values.avgSucceed,
                    succeed: values.succeed
                }
                this.props.setData(params)
            }
        })
        
    };
    
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        return(
            <div>
                <Table
                    columns={this.columns}
                    dataSource={this.props.data}
                    bordered
                />
                <Modal
                    title={this.props.tab === 1 ? '季前赛' : '常规赛'}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                >
                    <Form {...formItemLayout}>
                        <Row>
                            <Col span={12}>
                                <h2>赛季表现</h2>
                                <Form.Item label="命中率">
                                    {getFieldDecorator('amount', {
                                        rules: [
                                            { required: true, message: '请填写数值!' },
                                            { type: 'number', message: '请填写数字!' },
                                        ],
                                    })(
                                        <InputNumber max={100} />,
                                    )}
                                </Form.Item>
                                <Form.Item label="投篮">
                                    {getFieldDecorator('area', {
                                        rules: [
                                            { required: true, message: '请填写数值!' },
                                            { type: 'number', message: '请填写数字!' },
                                        ],
                                    })(
                                        <InputNumber />,
                                    )}
                                </Form.Item>
                                <Form.Item label="命中">
                                    {getFieldDecorator('avgAmount', {
                                        rules: [
                                            { required: true, message: '请填写数值!' },
                                            { type: 'number', message: '请填写数字!' },
                                        ],
                                    })(
                                        <InputNumber />,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <h2>近五场表现</h2>
                                <Form.Item label="命中率">
                                    {getFieldDecorator('avgArea', {
                                        rules: [
                                            { required: true, message: '请填写数值!' },
                                            { type: 'number', message: '请填写数字!' },
                                        ],
                                    })(
                                        <InputNumber />,
                                    )}
                                </Form.Item>
                                <Form.Item label="投篮">
                                    {getFieldDecorator('avgSucceed', {
                                        rules: [
                                            { required: true, message: '请填写数值!' },
                                            { type: 'number', message: '请填写数字!' },
                                        ],
                                    })(
                                        <InputNumber />,
                                    )}
                                </Form.Item>
                                <Form.Item label="命中">
                                    {getFieldDecorator('succeed', {
                                        rules: [
                                            { required: true, message: '请填写数值!' },
                                            { type: 'number', message: '请填写数字!' },
                                        ],
                                    })(
                                        <InputNumber />,
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}
const TableForm = Form.create()(MyTable);
export default TableForm