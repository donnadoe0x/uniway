import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const informationPageDetails = ({ navigation }: any) => {
  return (

    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          جامعة ام القرى
        </Text>

        <Text style={styles.description}>
          في عام 1369 هـ أمر الملك عبد العزيز بن عبد الرحمن
          آل سعود رحمه الله بتأسيس كلية الشريعة في مكة
          المكرمة لتصبح أول المؤسسات التعليمية الجامعية
          في المملكة.

          {'\n\n'}

          وفي عام 1401 هـ أُنشئت جامعة أم القرى والتي تعد
          أكبر الجامعات السعودية من حيث عدد الطلبة ومن
          أكثر الجامعات شمولية للتخصصات وتميزاً بحكم
          موقعها وعراقتها.

          {'\n\n'}

          وتضم الجامعة العديد من الكليات والمعاهد
          والتخصصات العلمية والصحية والهندسية
          والإنسانية المختلفة.
        </Text>

      </ScrollView>

    </View>
  );
};

export default informationPageDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003B5C',
  },

  scrollContent: {
    paddingTop: 80,
    paddingHorizontal: 28,
    paddingBottom: 60,
  },

  back: {
    color: '#fff',
    fontSize: 52,
    marginBottom: 25,
  },

  title: {
    color: '#fff',
    fontSize: 31,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 30,
  },

  description: {
    color: '#fff',
    fontSize: 19,
    lineHeight: 42,
    textAlign: 'right',
  },
});