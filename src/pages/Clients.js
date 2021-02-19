import React,{ useState,useEffect } from 'react'
import Datatable from "../components/DataTable"
import useAsync from '../message-control/renderer';
import {
  TeamOutlined
} from '@ant-design/icons';
import {message,notification} from "antd"

const  placement="bottomRight"
const duration=2
export default function Clients() {
  const { sendAsync } = useAsync()
  // const [data, setData] = useState([])
  const [dataSource,setdataSource] = useState([])
  useEffect(() => {
    sendAsync({
      method: 'GET',
      table: 'clients'
    }).then((result) => {
      console.log("res",result);
      setdataSource(result)
    });
  },[])


  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      editable: true,
      inputParams: { required: true },
    },
    {
      title: 'Nom prenom',
      dataIndex: 'fullname',
      editable: true,
      inputParams: { required: true },
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value,record) => record.fullname.indexOf(value) === 0,
      sorter: (a,b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Numer telephone',
      dataIndex: 'phone',
      type: 'number',
      inputParams: { required: true },
      editable: true,
      defaultSortOrder: 'descend',
      sorter: (a,b) => a.phone - b.phone,
    },
    {
      title: 'Address',
      dataIndex: 'adress',
      editable: true,
      inputParams: { required: true },
      sorter: (a,b) => a.address.length - b.address.length,
      sortDirections: ['descend','ascend'],
    }
  ];

  const handleEdit = (newRow) => {
    sendAsync({
      method: 'PATCH',
      table: 'clients',
      set: "code=?, fullname=?, phone=?, adress=?",
      where: "key=?",
      params: [...Object.values(newRow)]
    }).then((result) => {
      console.log("res",result);
      // setData(result)
      setdataSource((data) => data.map(item => {
        if (item.key === newRow.key) return newRow
        else return item;
      }))
      notification.success({
        message: 'Sauvegardé avec succès',
        placement,
        duration
      });
    });


  }

  const handleRemove = (row) => {
    sendAsync({
      method: 'DELETE',
      table: 'clients',
      where: 'key=?',
      params: row.key
    }).then((result) => {
      console.log("res",result);
      // setData(result)
      setdataSource((data) => data.filter(item => item.key !== row.key))
      // message.success("Supprimé avec succès")
      notification.success({
        message: "Supprimé avec succès",
        placement,
        duration
      });
    });

  }

  const handleAdd = (newRow) => {
    sendAsync({
      method: 'POST',
      table: 'clients',
      set: "(code, fullname, phone, adress) VALUES (?, ?, ?, ?)",
      params: Object.values(newRow)
    }).then((result) => {
      console.log("res",result);
      // setData(result)
      setdataSource((oldDS) => [...oldDS,newRow])
      // message.success("Ajouté avec succès")
      notification.success({
        message: "Ajouté avec succès",
        placement,
        duration
      });
    });
  }

  return (
    <article>
      <Datatable
        title={<span style={{display:'flex', alignItems:'center', gap:14}}><TeamOutlined />Clients</span>}
        addBtnTitle={"Ajouter un client"}
        data={{ rows: dataSource,columns }}
        handleEdit={handleEdit}
        handleRemove={handleRemove}
        handleAdd={handleAdd}
      />
    </article>
  );
}
