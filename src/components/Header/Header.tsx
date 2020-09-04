import React, {useEffect, useState} from 'react';
import classes from './Header.module.scss'

const Header = () => {

   // let array = useState(false); // это значение не храниться локально, тк. функция не имеет стэйта,
    // значение хранится на стороне реакта // array = тут только одно значение и одна функция т.е. 2 элемента
   // let editMode = array[0]; // здесь начальное значение, те false, который мы задали на строке выше
  //  let setEditMode = array[1]; // здесь функция, которая изменяет первое одиночное значение

    // деструктурированное присваивание
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState("start");  // если нужно, то добавляем ещё один стэйт
    // получаем два разных состояния, которые меняются независимо друг от друга

    useEffect( () => {
        //setStatus(props.status);
    }, [] );  // [] -  реакт, запускай useEffect не всегда, а только тогда, когда компонента вмонтировалась первый раз
    // вообще не правильно закидывать пустой массив в useEffect, нужно чтобы он срабатывал, когда ещё приходят пропсы
    // указываем в массивые зависимость от props.status те. [props.status],
    // таким образом, елси при очередной перерисовки, props.status будет другим, то запустится useEffect

    const activateEditMode = () => {
        setEditMode(true); // setEditMode - это второе значение, которым является функция
    }

    const deactivateEditMode = () => {
        setEditMode(false);
    }

    const onStatusChange = (e: any) => {
        setStatus(e.currentTarget.value);
    }

    // методов жизненного цикла в хуках нет

    return (
        <header className={classes.header}>
            <div>logo</div>
            <nav>
                <ul>
                    <li>Home</li>
                </ul>
            </nav>
            <div>
                {
                    !editMode &&
                    <div><span onDoubleClick={ activateEditMode } >botton</span> <div>status: {status}</div></div>
                }
                {
                    editMode &&
                    <div><input onChange={onStatusChange} autoFocus={true} onBlur={ deactivateEditMode } value={status} /></div>
                }
            </div>
        </header>
    );
}

export default Header;