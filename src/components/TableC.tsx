import axios from 'axios';
import React from 'react';
import { Table } from 'react-bootstrap';
import { ICurrencyfull } from '../types/types';

const TableC = () => {
  const [firstCol, setFirstCol] = React.useState<ICurrencyfull>();
  const [secondCol, setSecondCol] = React.useState<ICurrencyfull>();
  const [thirdCol, setThirdCol] = React.useState<ICurrencyfull>();

  React.useEffect(() => {
    subcribeCurrency();
  }, []);

  const subcribeCurrency = async () => {
    try {
      const [firstCollResp, SecondCollResp, ThirdCollResp] = await Promise.all([
        axios.get('http://localhost:3000/api/v1/first/poll'),
        axios.get('http://localhost:3000/api/v1/second/poll'),
        axios.get('http://localhost:3000/api/v1/third/poll'),
      ]);
      setFirstCol(firstCollResp.data);
      setSecondCol(SecondCollResp.data);
      setThirdCol(ThirdCollResp.data);
      await subcribeCurrency();
    } catch (error) {
      alert('ошибка');
      setTimeout(() => {
        subcribeCurrency();
      });
    }
  };

  let arrayRUB: Array<number> = [];
  let arrayUSD: Array<number> = [];
  let arrayEUR: Array<number> = [];

  if (firstCol !== undefined) {
    arrayRUB = [firstCol.rates.RUB, secondCol!.rates.RUB, thirdCol!.rates.RUB];
    arrayUSD = [firstCol?.rates.USD, secondCol!.rates.USD, thirdCol!.rates.USD];
    arrayEUR = [firstCol?.rates.EUR, secondCol!.rates.EUR, thirdCol!.rates.EUR];
  }

  const minValRUB = Math.min(...arrayRUB);
  const minValUSD = Math.min(...arrayUSD);
  const minValEUR = Math.min(...arrayEUR);

  const newArrMinAll = [minValRUB, minValUSD, minValEUR];
  const minValAll = Math.min(...newArrMinAll);

  const haveRub = arrayRUB.indexOf(minValAll);
  const haveUsd = arrayUSD.indexOf(minValAll);
  const haveEur = arrayEUR.indexOf(minValAll);

  return (
    <div>
      {firstCol ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Pair name/market</th>
              <th>First</th>
              <th>Second</th>
              <th>Third</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>RUB/CUPCAKE</td>
              {arrayRUB.map((oneval, index) => (
                <td className={haveRub === index ? 'Zakarchka' : ''} key={index}>
                  {Math.round(oneval)}
                </td>
              ))}
            </tr>
            <tr>
              <td>USD/CUPCAKE</td>
              {arrayUSD.map((oneval, index) => (
                <td className={haveUsd === index ? 'Zakarchka' : ''} key={index}>
                  {Math.round(oneval)}
                </td>
              ))}
            </tr>
            <tr>
              <td>EURO/CUPCAKE</td>
              {arrayEUR.map((oneval, index) => (
                <td className={haveEur === index ? 'Zakarchka' : ''} key={index}>
                  {Math.round(oneval)}
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default TableC;
