import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { Container, Label } from './styles';

export default function Card({ data, index }) {
    const ref = useRef();

    const [{ isDragging }, dragRef] = useDrag({
        item: { type: 'CARD', index  },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    })

    const [, dropRef] = useDrop({
        accept: 'CARD',
        hover(item, monitor) {
            const draggedIndex = item.index;
            const targetIndex = index;

            if(draggedIndex === targetIndex) { //se o card for arrastado em cima dele mesmo, não faz nada.
                return;
            }
            
            const targetSize = ref.current.getBoundingClientRect();// retornando o tamanho do elemento.
            console.log(targetSize);
        }
        
    })

    dragRef(dropRef(ref));

    return (
        <Container ref={ref} isDragging={isDragging}>
            <header>
                {data.labels.map(label => <Label key={label} color={label} />)}
            </header>
            <p>{data.content}</p>
            { data.user && <img src={data.user} alt="avatar" />}
        </Container>
    );
}