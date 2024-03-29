import React, { useEffect, useState } from 'react';
import {useNavigation} from '@react-navigation/native';
//import AsyncStorage from 'react-native-async-storage/async-storage';
import C from './style';

import {useStateValue} from '../../context/StateContext';
import api from '../../services/api';

import DocItem from '../../components/DocItem';

export default() => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [loading, setLoading] = useState(true);
  const [docList, setDocList] = useState([]);

  useEffect(()=>{
    navigation.setOptions({
      headerTitle: 'Documentos'
    });
    getDocs();
  }, []);

  const getDocs = async () => {
    setDocList([]);
    setLoading(true);
    const result = await api.getDocs();
    setLoading(false);
    if(result.error === ''){
      setDocList(result.list);
    } else {
      alert(result.error);
    }
  }

  return (
    <C.Container>
        {loading &&
          <C.LoadingIcon color="#8863E6" size="large" />
        }
        {!loading && docList.length === 0 &&
            <C.NoListArea>
                <C.NoListText>Nao há documentos.</C.NoListText>
            </C.NoListArea>
        }
        <C.List 
            data={docList}
            onRefresh={getDocs}
            refreshing={loading}
            renderItem={({item})=><DocItem data={item} />}
            keyExtractor={(item)=>item.id.toString()}
        />
    </C.Container>
  );
}