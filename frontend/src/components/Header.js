import React from 'react';
import logo from '../assets/logo.png';

export default function Header({ setTipo }) {
    return (
        <header>
            <nav className="nav">
                <img src={logo} alt="Logo Pokédex" id="logo-pokedex" />
                <ul className="nav-list">
                    <li className="nav-item">
                        <button className="btn btn-header" onClick={() => setTipo('ver-todos')}>Ver todos</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-header normal" id="normal" onClick={() => setTipo('normal')}>Normal</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-header fire" id="fire" onClick={() => setTipo('fire')}>Fire</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-header water" id="water" onClick={() => setTipo('water')}>Water</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-header grass" id="grass" onClick={() => setTipo('grass')}>Grass</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-header electric" id="electric" onClick={() => setTipo('electric')}>Electric</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-header ice" id="ice" onClick={() => setTipo('ice')}>Ice</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-header fighting" id="fighting" onClick={() => setTipo('fighting')}>Fighting</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-header poison" id="poison" onClick={() => setTipo('poison')}>Poison</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-header ground" id="ground" onClick={() => setTipo('ground')}>Ground</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-header flying" id="flying" onClick={() => setTipo('flying')}>Flying</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-header psychic" id="psychic" onClick={() => setTipo('psychic')}>Psychic</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-header bug" id="bug" onClick={() => setTipo('bug')}>Bug</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-header rock" id="rock" onClick={() => setTipo('rock')}>Rock</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-header ghost" id="ghost" onClick={() => setTipo('ghost')}>Ghost</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-header dark" id="dark" onClick={() => setTipo('dark')}>Dark</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-header dragon" id="dragon" onClick={() => setTipo('dragon')}>Dragon</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-header steel" id="steel" onClick={() => setTipo('steel')}>Steel</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-header fairy" id="fairy" onClick={() => setTipo('fairy')}>Fairy</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}