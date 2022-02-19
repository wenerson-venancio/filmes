import React, { useState, useEffect  } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';

import SliderItem from '../../components/SliderItem';

import { 
        Container,
        SearchContainer,
        Input,
        SearchButton,
        Title,
        BannerButton,
        SliderMovie,
        Banner } from './styles';

import Header from '../../components/Header';

import { Feather } from '@expo/vector-icons';

import api, { key } from '../../services/api';

import { getListMovies } from '../../utils/movie';

function Home() {

    const [nowMovies, setNowMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        
        let isActive = true;

        async function getMovies(){

            const [nowData, popularData, topData] = await Promise.all([
                api.get('/movie/now_playing', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
                api.get('/movie/popular', {
                    params: {
                        api_key: key,
                        language: 'pt-BR', 
                        page: 1,
                    }
                }),
                api.get('/movie/top_rated', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
            ])

            const nowList = getListMovies(20, nowData.data.results);
            const popularList = getListMovies(10, popularData.data.results);
            const topList = getListMovies(10, topData.data.results);

            setNowMovies(nowList);
            setPopularMovies(popularList);
            setTopMovies(topList);

            setLoading(false);

        }

        getMovies();

    }, [])

    if(loading){
        return(
            <Container>
                <ActivityIndicator
                    size="large"
                    color="#fff"
                />
            </Container>
        )
    }



    return(
        <Container>  
            <Header title="Prime Movie"/>
            <SearchContainer>
                <Input
                    placeholder="Ex Vingadores"
                    placeholderTextColor="#ddd"
                />
                <SearchButton>
                    <Feather name="search" size={30} color="#fff"/>
                </SearchButton>
            </SearchContainer>
            <ScrollView showsVerticalScrollIndicator={false}>

                <Title>Em Cartaz</Title>
                <BannerButton activeOpacity={0.9} onPress={ ()=> alert('teste')}>
                    <Banner
                        resizeMethod="resize"
                        source={{ uri: 'https://images.unsplash.com/photo-1507835661088-ac1e84fe645f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGZyZWV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60' }}
                    />
                </BannerButton>

                <SliderMovie
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={nowMovies}
                    renderItem={({ item })=> <SliderItem data={item}/>}
                    keyExtractor={ (item)=> String(item.id)}
                />

                <Title>Populares</Title>
                <SliderMovie
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={popularMovies}
                    renderItem={({ item })=> <SliderItem data={item}/>}
                    keyExtractor={ (item)=> String(item.id)}
                />

                <Title>Mais Votados</Title>
                <SliderMovie
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={topMovies}
                    renderItem={({ item })=> <SliderItem data={item}/>}
                    keyExtractor={ (item)=> String(item.id)}
                />
            </ScrollView>
        </Container>
    );
}

export default Home;