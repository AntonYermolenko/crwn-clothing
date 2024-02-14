import {BackgroundImage, Body, DirecotoryItemContainer} from './directory-item.styles'
import { useNavigate } from 'react-router-dom';
import { DirectoryCategory } from '../directory/directory.component';
import { FC } from 'react';

type DirecotryItemProps = {
    category: DirectoryCategory;
}

const DirecotryItem: FC<DirecotryItemProps> = ({ category }) => { 
    const {imageUrl, title, route} = category;
    const navigate = useNavigate();
    const onNavigateHandler = () => navigate(route);
    return(
        <DirecotoryItemContainer onClick={onNavigateHandler}>
        <BackgroundImage imageUrl={imageUrl}/>
        <Body>
            <h2>{title}</h2>
            <p>Shop Now</p>
        </Body>
    </DirecotoryItemContainer>
    )
}

export default DirecotryItem;