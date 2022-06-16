import axios from 'axios';
import React from 'react';
import { Table } from 'react-bootstrap';
import { ICurrencyfull } from '../types/types';

const TableC = () => {
  const [firstCol, setFirstCol] = React.useState<ICurrencyfull>();
  const [secondCol, setSecondCol] = React.useState<ICurrencyfull>();
  const [thirdCol, setThirdCol] = React.useState<ICurrencyfull>();

  React.useEffect(() => {
    subcribeCurrencyFirst();
    subcribeCurrencySecond();
    subcribeCurrencyThird();
  }, []);

  const subcribeCurrencyFirst = async () => {
    try {
      const firstCollResp = await axios.get('http://localhost:3000/api/v1/first/poll');

      setFirstCol(firstCollResp.data);
      await subcribeCurrencyFirst();
    } catch (error) {
      alert('ошибка');
      setTimeout(() => {
        subcribeCurrencyFirst();
      });
    }
  };
  const subcribeCurrencySecond = async () => {
    try {
      const SecondCollResp = await axios.get('http://localhost:3000/api/v1/second/poll');

      setSecondCol(SecondCollResp.data);
      await subcribeCurrencySecond();
    } catch (error) {
      alert('ошибка');
      setTimeout(() => {
        subcribeCurrencySecond();
      });
    }
  };
  const subcribeCurrencyThird = async () => {
    try {
      const ThirdCollResp = await axios.get('http://localhost:3000/api/v1/third/poll');

      setThirdCol(ThirdCollResp.data);
      await subcribeCurrencyThird();
    } catch (error) {
      alert('ошибка');
      setTimeout(() => {
        subcribeCurrencyThird();
      });
    }
  };

  let arrayRUB: Array<number> = [];
  let arrayUSD: Array<number> = [];
  let arrayEUR: Array<number> = [];

  if ((firstCol && secondCol && thirdCol) !== undefined) {
    arrayRUB = [firstCol!.rates.RUB, secondCol!.rates.RUB, thirdCol!.rates.RUB];
    arrayUSD = [firstCol!.rates.USD, secondCol!.rates.USD, thirdCol!.rates.USD];
    arrayEUR = [firstCol!.rates.EUR, secondCol!.rates.EUR, thirdCol!.rates.EUR];
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
