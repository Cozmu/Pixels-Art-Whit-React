/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [targetColor, setTargetColor] = useState('');
  const [hexColor, setHexColor] = useState([]);
  const [tableSize, setTableSize] = useState('');
  const [tableDisplay, setTableDisplay] = useState([]);
  const [gridColumn, setGridColumn] = useState('');

  const generateColor = () => {
    const colors = [];
    const SIXTEEN = 16;
    const SIX = 6;
    const THREE = 3;
    for (let index = 0; index < THREE; index += 1) {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < SIX; i += 1) {
        color += letters[Math.floor(Math.random() * SIXTEEN)];
      }
      colors.push(color);
    }
    setHexColor(colors);
  };

  const generateTable = () => {
    const FIVE = 5;
    const FORTY = 40;
    const fakeArr = [];
    if ((tableSize !== '' && tableSize > FORTY)
    || (tableSize !== '' && tableSize < 1)) {
      setTableSize('');
      return global.alert('Valores maiores que 40 ou menores que 1 não são suportados');
    }
    if (tableSize === '') {
      for (let index = 1; index <= (FIVE * FIVE); index += 1) {
        fakeArr.push(index);
      }
    }
    for (let index = 1; index <= (tableSize * tableSize); index += 1) {
      fakeArr.push(index);
    }
    setGridColumn(tableSize);
    setTableDisplay(fakeArr);
    setTableSize('');
  };

  const selectedColor = ({ target: { style: { backgroundColor } } }) => {
    setTargetColor(backgroundColor);
  };

  const brush = ({ target: { style } }) => {
    style.backgroundColor = targetColor;
  };

  const clearTable = () => {
    const clearPixel = document.getElementsByClassName('pixel');
    for (let index = 0; index < clearPixel.length; index += 1) {
      clearPixel[index].style.backgroundColor = 'white';
    }
  };

  useEffect(() => {
    generateColor();
    generateTable();
  }, []);

  return (
    <main>
      <header className="header-container">
        <h1>Paleta de Cores</h1>
        <section className="cor-atual-container">
          <h3>Cor Atual:</h3>
          <div
            style={ { backgroundColor: targetColor } }
            className="pixel"
          />
        </section>
      </header>
      <section className="conteudo">
        <div className="form-container">
          <label htmlFor="123">
            <input
              id="123"
              type="number"
              placeholder="Insira o tamanho desejado."
              onChange={ ({ target }) => setTableSize(target.value) }
              value={ tableSize }
            />
          </label>
          <button
            type="button"
            onClick={ generateTable }
          >
            APLICAR
          </button>
          <button
            className="btn-clear"
            type="button"
            onClick={ clearTable }
          >
            LIMPAR
          </button>
        </div>
        <article
          className="color-palette"
        >
          <button
            type="button"
            className="color"
            style={ { backgroundColor: 'white' } }
            onClick={ selectedColor }
          />
          <button
            type="button"
            className="color"
            style={ { backgroundColor: 'black' } }
            onClick={ selectedColor }
          />
          <button
            type="button"
            className="color"
            style={ { backgroundColor: hexColor[0] } }
            onClick={ selectedColor }
          />
          <button
            type="button"
            className="color"
            style={ { backgroundColor: hexColor[1] } }
            onClick={ selectedColor }
          />
          <button
            type="button"
            className="color"
            style={ { backgroundColor: hexColor[2] } }
            onClick={ selectedColor }
          />
        </article>
        <section
          style={ { gridTemplateColumns: `repeat(${gridColumn}, 40px)` } }
          className="table-container"
        >
          {tableDisplay.map((e) => (
            <button
              type="button"
              onClick={ brush }
              className="pixel"
              key={ e }
            />
          ))}
        </section>
      </section>
    </main>
  );
}

export default App;
