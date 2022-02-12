import React from 'react';
import { Feather } from '@expo/vector-icons'
import { Container, MenuButton, Title } from './styles';


function Header(){
    return(
        <Container>
            <MenuButton>
                <Feather name="menu" size={36} color="#FFF"/>
            </MenuButton> 
        </Container>
    )
}

export default Header;