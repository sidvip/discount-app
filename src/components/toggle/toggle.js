import './toggle.css';

export default function Toggle({ isOpen, setOpen }) {


    return (
        <span className={`base cursor-pointer ${isOpen ? '' : 'closed'}`} onClick={() => {
            setOpen();
        }}>
            <span className={`switch ` + (isOpen ? 'switch-move' : '')}></span>
        </span>
    )
}