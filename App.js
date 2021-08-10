import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

const App = () => {
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState([]);
  const onChangeText = () => {
    if (value != "") {
      setTodo([...todo, { id: Math.random(), value: value, durum: 0 }])
      setValue("")
    }
  }
  const updateTextItem = (item) => {
    const newTodo = todo.map(todoItem => todoItem.id == item.id ? { ...todoItem, durum: !item.durum } : todoItem)
    setTodo(newTodo)
  }
  const renderItem = ({ item }) => {
    return <Text onPress={() => updateTextItem(item)} style={{ margin: 10, flex: 1, backgroundColor: item.durum == 0 ? "#7ca453" : "gray", borderRadius: 10, padding: 20, color: item.durum == 1 ? "white" : "white", textDecorationLine: item.durum == 1 ? "line-through" : "none" }}>{item.value}</Text>
  }
  const todoCount = () => {
    return todo.filter(todoItem => {
      if (todoItem.durum == 0) {
        return todoItem
      }
    }).length
  }
  return (<SafeAreaView style={styles.container}>
    <View style={styles.todoTopArea}>
      <Text style={styles.todoText}>
        Yapılacaklar
      </Text>
      <Text style={styles.todoCounter}>
        {todo && todoCount()}
      </Text>
    </View>
    <FlatList
      data={todo}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
    <View style={styles.inpArea}>
      <TextInput value={value} onChangeText={text => setValue(text)} placeholder="something" placeholderTextColor="white" style={styles.inp} placeholder="Yapılacak..." />
      <TouchableOpacity onPress={() => onChangeText()}
        style={{ backgroundColor: 'gray', borderRadius: 10 }}>
        <Text style={{ color: "white", textAlign: "center", padding: 10 }} on>Kaydet</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#102027",
    flex: 1,
    justifyContent: "space-between",
  },
  todoTopArea: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todoText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "orange",
  },
  todoCounter: {
    color: "orange",
    fontSize: 30,
  },
  inpArea: {
    margin: 10,
    padding: 20,
    backgroundColor: "#37474f",
    borderRadius: 10
  },
  textItem: {
    margin: 10,
  },
  inp: {
    color: "white",
  },
  button: {
    color: "red", backgroundColor: '#00aeef',
  }
});

export default App;
