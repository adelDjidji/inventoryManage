import React,{ useState } from 'react'
import { Table,Input,InputNumber,Popconfirm,Form,Button,Modal,DatePicker,TimePicker,Select,Switch,Checkbox,Row,Col,Tooltip } from 'antd';
import "./style.css"
import {
    SaveFilled,
    DeleteOutlined,
    StopOutlined,
    EditFilled
    ,PlusCircleFilled,
    CheckCircleFilled
} from '@ant-design/icons';


const tailLayout = {
    wrapperCol: { offset: 8,span: 16 },
};

export default function DataTable({ data,handleEdit,handleRemove,handleAdd,title = "Tableau",addBtnTitle = "Ajouter" }) {
    const { rows,columns } = data
    const [form] = Form.useForm();
    const [data_,setData] = useState(rows);
    const [editingKey,setEditingKey] = useState('');
    const [removingItem,setremovingItem] = useState('')
    const isEditing = (record) => record.key === editingKey;
    const [isModalVisible,setIsModalVisible] = useState(false);

    const showModal = () => {
        form.resetFields()
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        const row = await form.validateFields();
        // let err= form.getFieldsError()
        let dataIndexs = columns.map(i => i.dataIndex)
        var obj = {}
        dataIndexs.forEach(i => obj[i] = row[i])
        console.log("obj",obj);
        handleAdd(obj)
        // console.log("err", err);
        setIsModalVisible(false);
        form.resetFields()
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                        children
                    )}
            </td>
        );
    };
    const edit = (record) => {
        form.setFieldsValue({
            fullname: '',
            phone: '',
            address: '',
            ...record,
        });
        setEditingKey(record.key);
    };
    const remove = (record) => {
        setremovingItem(record)
    };

    const confirmRemove = () => {
        console.log("remove",removingItem);
        handleRemove && handleRemove(removingItem)
    }
    const cancelRemove = () => {
        setremovingItem(null)
    }
    const cancel = () => {
        setEditingKey('');
    };

    const renderInput = (type = 'text',inputParams) => {
        switch (type) {
            case 'text':
                return <Input {...inputParams} />
            case 'number':
                return <InputNumber {...inputParams} />
            case 'currency':
                return <Input {...inputParams} suffix="DZD" />
            case 'date':
                return <DatePicker {...inputParams} />
            case 'time':
                return <TimePicker {...inputParams} />
            case 'select':
                return <Select {...inputParams}>
                    {inputParams?.options?.map(op => <Select.Option value={op.value}>{op.label}</Select.Option>)}
                </Select>
            case 'switch':
                return <Switch {...inputParams} />
            case 'checkbox':
                return <Checkbox>{inputParams?.label}</Checkbox>
            default:
                return <Input {...inputParams} />
        }
    }
    const save = async (key) => {
        try {
            const row = await form.validateFields();

            console.log("saving",row);
            const newData = [...data_];
            const index = newData.findIndex((item) => key === item.key);

            // if (index > -1) {


            const item = newData[index];
            console.log("handle save",{ ...item,...row });
            handleEdit({ ...item,...row,key })
            // newData.splice(index,1,{ ...item,...row });
            // setData(newData);
            setEditingKey('');
            // } else {
            //     // newData.push(row);
            //     setData(newData);
            //     setEditingKey('');
            // }
        } catch (errInfo) {
            console.log('Validate Failed:',errInfo);
        }
    };

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.type || 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    const operationsCol = {
        title: 'operation',
        dataIndex: 'operation',
        render: (_,record) => {
            const editable = isEditing(record);
            return editable ? (
                <span>
                    <a
                        href="javascript:;"
                        onClick={() => save(record.key)}
                        style={{
                            marginRight: 8,
                        }}
                    >
                        <Tooltip title="Sauvegarder"><SaveFilled /></Tooltip>

                    </a>
                    <Popconfirm title="Etes-vous sûr d'annuler les modifications?" onConfirm={cancel}>
                        <Tooltip title="Annuler les modifications">
                            <StopOutlined />
                        </Tooltip>
                    </Popconfirm>
                </span>
            ) : (
                    <div style={{ display: 'flex',justifyContent: "space-evenly" }}>
                        <Tooltip title="Modifier">
                            <a href="/" disabled={editingKey !== ''} onClick={(e) => { e.preventDefault(); edit(record) }}>
                                <EditFilled />
                            </a>
                        </Tooltip>
                        <Popconfirm title="Etes-vous sûr de supprimer?" onCancel={cancelRemove} onConfirm={confirmRemove}>
                            <Tooltip title="Supprimer">
                                <a style={{ color: 'red' }} href="/" onClick={(e) => { e.preventDefault(); remove(record) }}>
                                    <DeleteOutlined />
                                </a>
                            </Tooltip>
                        </Popconfirm>
                    </div>
                );
        },
    }

    return (
        <Form form={form} component={false} layout="horizontal">
            <Row type="flex" justify="space-between">
                <Col span={16}><h2>{title}</h2></Col>
                <Col span={4} ><Button icon={ <PlusCircleFilled />} type="primary" onClick={showModal}>{addBtnTitle}</Button></Col>
            </Row>
            <hr />
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                // rowClassName={classes}
                dataSource={rows}
                columns={[...mergedColumns,operationsCol]}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
            <Modal title="Ajout d'un nouveau article" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[]}>
                {
                    columns.map(col => {
                        return <Form.Item
                            label={col.title}
                            name={col.dataIndex}
                            rules={[{ required: col.inputParams?.required || false,message: `${col.title} est obligatoire !` }]}
                        >
                            {renderInput(col.type,col.inputParams)}
                        </Form.Item>
                    })
                }

                <Form.Item {...tailLayout}>
                    <Button icon={<CheckCircleFilled />} onClick={handleOk} type="primary" htmlType="submit">
                        Valider
                    </Button>
                </Form.Item>
            </Modal>
        </Form>
    );

};
