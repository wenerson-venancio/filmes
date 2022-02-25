import React, { useState, useEffect }  from 'react';
import { 
    Container, 
    Header,
    HeaderButton,
    Banner,
    ButtonLink,
    Title,
    ContentArea,
    Rate
} from './styles';

import { Feather, Ionicons } from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native';

import Stars from 'react-native-stars';

import api, { key } from '../../services/api'

function Detail(){

    const navigation = useNavigation();
    const route = useRoute();

  
    const [movie, setMovie] = useState({});
  
    useEffect(()=> {

        let isActive = true;
        
        async function getMovie(){
            const response = await api.get(`/movie/${route.params?.id}`, {
                params: {
                    api_key: key,
                    language: 'pt-BR'
                }
            })

            .catch((err)=> {
                console.log(err);
            })

            if(isActive){
                setMovie(response.data);
                //console.log(response.data);
            }
        }

        if(isActive){
            getMovie();
        }

        return()=> {
            isActive = false;
        }



    }, [])

    return(
        <Container>
            <Header>
                <HeaderButton activetyOpacity={0,7} onPress={ ()=> navigation.goBack()}>
                    <Feather
                        name="arrow-left"
                        size={38}
                        color="#fff"
                    />
                </HeaderButton>
                <HeaderButton>
                    <Ionicons
                        name={'bookmark'}
                        size={38}
                        color='#fff'
                    />
                </HeaderButton>
            </Header>
            <Banner
                resizeMethod="resize"
                source={{ uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}` }}
            />
            <ButtonLink>
                <Feather name="link" size={24} color="#fff"/>
            </ButtonLink>

            <Title numberOfLines={2}>{movie.title}</Title>
            
            <ContentArea>
                <Stars
                    default={movie.vote_average}
                    count={10}
                    starsize={20}
                    fullStar={ <Ionicons name="md-star" size={24} color="#e7a74e"/> }
                    emptyStar={ <Ionicons name="md-star-outline" size={24} color="#e7a74e"/> }
                    halfStar={ <Ionicons name="md-star-half" size={24} color="#e7a74e"/> }
                    disable={true}
                />
                <Rate>{movie.vote_average}/10</Rate>
            </ContentArea>
        </Container>
    )
}

export default Detail;