import React, {useState} from 'react';
import classes from './Header.module.scss'

const Header = () => {

   // let array = useState(false); // это значение не храниться локально, тк. функция не имеет стэйта,
    // значение хранится на стороне реакта // array = тут только одно значение и одна функция т.е. 2 элемента
   // let editMode = array[0]; // здесь начальное значение, те false, который мы задали на строке выше
  //  let setEditMode = array[1]; // здесь функция, которая изменяет первое одиночное значение

    // деструктурированное присваивание
    let [editMode, setEditMode] = useState(false);
    //let [status, setStatus] = useState(props.status);  // если нужно, то добавляем ещё один стэйт

    const activateEditMode = () => {
        setEditMode(true); // setEditMode - это второе значение, которым является функция
    }

    const deactivateEditMode = () => {
        setEditMode(false);
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
                    <div><span onDoubleClick={ activateEditMode } >botton</span></div>
                }
                {
                    editMode &&
                    <div><input autoFocus={true} onBlur={ deactivateEditMode } /></div>
                }
            </div>
        </header>
    );
}

export default Header;