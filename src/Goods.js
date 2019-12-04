import React from 'react';
import {GraphQLClient} from 'graphql-request';

const url = 'http://shop-roles.asmer.fs.a-level.com.ua/graphql';
const URL = 'http://shop-roles.asmer.fs.a-level.com.ua/';

export default function Goods(props) {
    const [goods, setGoods] = React.useState([]);

    React.useEffect( () => {

        const user = new GraphQLClient( url, {
            headers: {
                Authorization: `Bearer ${localStorage.auth}`,
            },
        } )

        const query = `
            query {
                GoodFind( query: "[{}]") {
                    _id
                    name
                    description
                    price
                    images {url}
                } 
            }`
        
        user.request(query).then( information => {
            setGoods( information.GoodFind )
        } )
    }, [] )

    return (
            <div className="goods">
                {goods.map( item => (
                    <div key={item._id}  className="boxItem">
                        <div className="itemName">{' ' + item.name}</div>
                        <div className="itemPrice">{item.price + '$'}</div>
                        <div className="itemDescription">{item.description}</div>
                        <img src={item.images ? URL + item.images[0].url : 'https://www.iphones.ru/wp-content/uploads/2015/05/errfolder.jpg'} alt=""/>
                    </div>    
                ))}
            </div>
       
    )
}