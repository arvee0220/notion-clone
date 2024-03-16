import { NodeData } from '../utils/types';
import { useRef, useEffect } from 'react';
import styles from './Title.module.css';
import { nanoid } from 'nanoid';

type TitleProps = {
    title: string;
    changePageTitle(title: string): void;
    addNode(node: NodeData, index: number): void;
};

export const Title = ({ title, changePageTitle, addNode }: TitleProps) => {
    const headerRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const isFocused = document.activeElement == headerRef.current;
        if (!isFocused && headerRef.current) {
            headerRef.current.textContent = title;
        }
    }, [title]);

    /* const inputHandler = (event: { currentTarget: { textContent: any } }) =>
        changePageTitle(event.currentTarget.textContent || '');

    const onKeyDownHandler = (event: { key: string; preventDefault: () => void }) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addNode({ type: 'text', id: nanoid(), value: '' }, 0);
        }
    }; */
    return (
        <div className={styles.container}>
            <h1
                className={styles.title}
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => changePageTitle(e.currentTarget.textContent || '')}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        addNode({ type: 'text', id: nanoid(), value: '' }, 0);
                    }
                }}
            />
        </div>
    );
};
