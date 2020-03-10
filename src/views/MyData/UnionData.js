import React, { Component } from 'react';
import { Table, Input, Form, InputNumber,Button,message} from 'antd';
import { withRouter } from 'react-router-dom'
import { queryUnionMessage,addUnionMessage } from '@/api'

const EditableContext = React.createContext();
class EditableCell extends Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    renderCell = ({ getFieldDecorator }) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        return (
        <td {...restProps}>
            {editing ? (
            <Form.Item style={{ margin: 0 }}>
                {getFieldDecorator(dataIndex, {
                rules: [
                    {
                    required: true,
                    message: `${title}!`,
                    },
                ],
                initialValue: record[dataIndex],
                })(this.getInput())}
            </Form.Item>
            ) : (
                children
            )}
        </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}
class EditableTable extends Component {
    constructor(props) {
        super(props);
        this.state = { data:[], editingKey: '',id: 1 };
        this.columns = [
            {
                title: '场数',
                dataIndex: 'games',
                editable: true
            },
            {
                title: '先发',
                dataIndex: 'start',
                editable: true
            },
            {
                title: '分钟',
                dataIndex: 'minute',
                editable: true
            },
            {
                title: '命中率',
                dataIndex: 'hitRate',
                editable: true
            },
            {
                title: '三分',
                dataIndex: 'threePointer',
                editable: true
            },
            {
                title: '进攻',
                dataIndex: 'attack',
                editable: true
            },
            {
                title: '防守',
                dataIndex: 'guard',
                editable: true
            },
            {
                title: '失误',
                dataIndex: 'fault',
                editable: true
            },
            {
                title: '场均篮板',
                dataIndex: 'avgBackboard',
                editable: true
            },
            {
                title: '场均抢断',
                dataIndex: 'avgSteal',
                editable: true
            },
            {
                title: '场均盖帽',
                dataIndex: 'avgBlockShot',
                editable: true
            },
            
            {
                title: '犯规',
                dataIndex: 'foul',
                editable: true
            },
            {
                title: '场均得分',
                dataIndex: 'avgScore',
                editable: true
            },
            {
                title: '场均助攻',
                dataIndex: 'avgAssist',
                editable: true
            },
            {
                title: '操作',
                width: '10%',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
                    <span>
                        <EditableContext.Consumer>
                        {form => (
                            <a
                            onClick={() => this.save(form, record.key)}
                            style={{ marginRight: 8 }}
                            >
                                保存
                            </a>
                        )}
                        </EditableContext.Consumer>
                        
                        <a onClick={() => this.cancel(record.key)}>取消</a>
                        
                    </span>
                    ) : (
                    <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                        编辑
                    </a>
                    );
                },
            },
        ];
    }
    
    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };
    componentDidMount(){
        
        this.getQueryMessage(this.state.id)
        
        
    }
    postAddMessage = (params) => {
        addUnionMessage(this.state.data[0]).then(res => {
            if(res.code === 200){
                message.success('操作成功！');
            }
        })
    }
    getQueryMessage = (id) =>　{
        queryUnionMessage(id).then(res =>　{
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
                        id: id,
                        games: 0,
                        start: 0,
                        minute: 0,
                        hitRate: 0,
                        threePointer: 0,
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
    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ data: newData, editingKey: '' });
                
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
            
        });
    }

    edit(key) {
        this.setState({ editingKey: key });
    }

    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <div>
                <EditableContext.Provider value={this.props.form}>
                    <Table
                        components={components}
                        bordered
                        dataSource={this.state.data}
                        columns={columns}
                        rowClassName="editable-row"
                        pagination={false}
                    />
                </EditableContext.Provider>
                <div style={{padding: '20px 0',textAlign: 'right'}}>
                    <Button type="primary" onClick={this.postAddMessage}>提交</Button>
                </div>
            </div>
            
        );
    }
}
const UnionData = Form.create()(EditableTable);
export default withRouter(UnionData)