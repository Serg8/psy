import React, { useEffect, useState, useRef } from 'react';
import classes from './Develop.module.scss';

const Develop = () => {
  ///====useState===========================

  // let array = useState(false); // это значение не храниться локально, тк. функция не имеет стэйта,
  // значение хранится на стороне реакта // array = тут только одно значение и одна функция т.е. 2 элемента
  // let editMode = array[0]; // здесь начальное значение, те false, который мы задали на строке выше
  //  let setEditMode = array[1]; // здесь функция, которая изменяет первое одиночное значение

  // деструктурированное присваивание
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState('start'); // если нужно, то добавляем ещё один стэйт
  // получаем два разных состояния, которые меняются независимо друг от друга

  useEffect(() => {
    //setStatus(props.status);
  }, []); // [] -  реакт, запускай useEffect не всегда, а только тогда, когда компонента вмонтировалась первый раз
  // вообще не правильно закидывать пустой массив в useEffect, нужно чтобы он срабатывал, когда ещё приходят пропсы
  // указываем в массивые зависимость от props.status те. [props.status],
  // таким образом, елси при очередной перерисовки, props.status будет другим, то запустится useEffect

  const activateEditMode = () => {
    setEditMode(true); // setEditMode - это второе значение, которым является функция
  };

  const deactivateEditMode = () => {
    setEditMode(false);
  };

  const onStatusChange = (e: any) => {
    setStatus(e.currentTarget.value);
  };

  // методов жизненного цикла в хуках нет

  // =============================================================================================

  const computeInitialCounter = () => {
    console.log('same calculations ...');
    return Math.trunc(Math.random() * 20);
  };

  const [counter, setCounter] = useState(() => {
    return computeInitialCounter();
  });
  // hook useState нельзя использовать внутри условий if
  // hook работает асинхронно
  // можно использовать callBack функцию, чтобы оптимизировать performance, чтобы функция computeInitialCounter
  // не вызывалась каждый раз при рендеренге

  // формат объект
  const [state, setState] = useState({
    title: 'Счётчик',
    date: Date.now(),
  });

  const increment = () => {
    //setCounter(counter + 1);
    setCounter((prevCounter) => {
      return prevCounter + 1;
    });
    // setCounter( prev => prev + 1);
  };

  const decrement = () => {
    setCounter(counter - 1);
  };

  const changeTitle = () => {
    setState((prev) => {
      return {
        ...prev,
        title: 'new title',
      };
    });
  };

  ///====useState=========end==================
  ///====useEffect=========start==================

  const [data, setData] = useState([]);
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

  // interface UserData {
  //     username: string;
  //     password: string;
  //     prevState: 'users'
  // }

  // let type: string, setType: any;
  const [type, setType] = useState(`users`);

  const todos = () => {
    setType('todos');
  };
  const posts = () => {
    setType('posts');
  };
  const users = () => {
    setType('users');
  };

  // useEffect вызывается каждый раз, когда происходит рендер
  // useEffect(() => {
  //     console.log('render');
  // });

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((response) => response.json())
      .then((json) => setData(json));

    return () => {
      console.log('clean type');
    };
  }, [type]); // указываем зависимоть useEffect от deps, чтобы он срабатывал только тогда, когда deps изменился

  useEffect(() => {
    console.log('ComponentDidMount');

    window.addEventListener('mousemove', (event) => {
      setPos({
        x: event.clientX,
        y: event.clientY,
      });
    });
  }, []); // тк пустой массив в списке зависимостей, то этот useEffect сработает только один первый раз, как ComponentDidMount

  ///====useEffect=========end==================
  ///====useRef=========start==================

  //const [renderCount, setRenderCount] = useState(1);
  const [value, setValue] = useState('initial');
  const renderCount = useRef(1);
  const inputRef = useRef(null);
  const prevValue = useRef('');

  useEffect(() => {
    //setRenderCount(prev => prev + 1)
    renderCount.current++;
  });

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  const focus = () => {};

  ///====useRef=========end==================
  ///====use=========start==================

  return (
    <div className={classes.wrapperDevelop}>
      <h1>hook useState</h1>
      <div>
        <h2>Change status</h2>
        {!editMode && (
          <div>
            <span onDoubleClick={activateEditMode}>botton</span>{' '}
            <div>status: {status}</div>
          </div>
        )}
        {editMode && (
          <div>
            <input
              onChange={onStatusChange}
              autoFocus={true}
              onBlur={deactivateEditMode}
              value={status}
            />
          </div>
        )}
      </div>

      <div>
        <h2>Counter: {counter}</h2>
        <button onClick={increment} className={`${classes.btn} ${classes.btnSuccess}`}>
          Add
        </button>
        <button onClick={decrement} className={`${classes.btn} ${classes.btnDelete}`}>
          Remove
        </button>
        <button onClick={changeTitle} className={`${classes.btn} ${classes.btnDefault}`}>
          Change title
        </button>

        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>

      <hr />
      <hr />
      <h1>hook useEffect</h1>

      <h2>Ресурс: {type}</h2>
      <button onClick={users} className={`${classes.btn} ${classes.btnDefault}`}>
        Пользователи
      </button>
      <button onClick={todos} className={`${classes.btn} ${classes.btnDefault}`}>
        toDos
      </button>
      <button onClick={posts} className={`${classes.btn} ${classes.btnDefault}`}>
        Посты
      </button>

      {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
      <pre>{JSON.stringify(pos, null, 2)}</pre>

      <hr />
      <hr />
      <h1>hook useRef</h1>
      <div>Количество рендеров - {renderCount.current}</div>
      <div>Прошлое состояние - {prevValue.current}</div>
      <input type="text" ref={inputRef} value={value} />
      <button className={classes.btnDefault} onClick={focus}>
        focus
      </button>
    </div>
  );
};

export default Develop;
