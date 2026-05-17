import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import Header from '../../components/layout/Header';
import BottomNav from '../../components/layout/BottomNav';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const informationPage = ({ navigation }: any) => {

  const [openCard, setOpenCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    );

    setOpenCard(openCard === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar
        backgroundColor="#1a1a1a"
        barStyle="light-content"
      />

      {/* HEADER */}
      <Header
        title="uniWay"
        navigation={navigation}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* CARD 1 */}
        <View style={styles.card}>

          <TouchableOpacity
            onPress={() => navigation.navigate('InformationDetails')}
          >
            <Text style={styles.more}>
              المزيد
            </Text>
          </TouchableOpacity>

          <Text style={styles.title}>
            جامعة ام القرى
          </Text>

          <Text style={styles.description}>
            في عام 1369 هـ أمر الملك عبد العزيز بن عبد الرحمن
            آل سعود رحمه الله بتأسيس كلية الشريعة في مكة
            المكرمة لتصبح أول المؤسسات التعليمية الجامعية
            في المملكة.
          </Text>

        </View>

        {/* CARD 2 */}
        <View style={styles.card}>

          <TouchableOpacity
            onPress={() => toggleCard(2)}
          >
            <Text style={styles.more}>
              {openCard === 2 ? 'إخفاء' : 'المزيد'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.title}>
            موقع الجامعة
          </Text>

          <Text style={styles.link}>
            https://maps.app.goo.gl/
          </Text>

          {openCard === 2 && (
            <View style={styles.detailsContainer}>

              <Text style={styles.detailsTitle}>
                الموقع
              </Text>

              <Text style={styles.detailsText}>
                يمكنك الوصول لموقع الجامعة من خلال
                الرابط الموجود بالأعلى.
              </Text>

            </View>
          )}

        </View>

      </ScrollView>

      {/* BOTTOM NAV */}
      <BottomNav
        navigation={navigation}
        route={{ name: 'Information' }}
      />

    </SafeAreaView>
  );
};

export default informationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 40,
    paddingBottom: 120,
  },

  card: {
    backgroundColor: '#990000',
    borderRadius: 25,

    paddingTop: 18,
    paddingHorizontal: 20,
    paddingBottom: 22,

    marginBottom: 28,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 7,
  },

  more: {
    color: '#fff',
    fontSize: 15,
    textDecorationLine: 'underline',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },

  title: {
    color: '#fff',
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 16,
  },

  description: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 31,
    textAlign: 'right',
  },

  link: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },

  detailsContainer: {
    marginTop: 22,

    backgroundColor: '#003B5C',

    borderRadius: 22,

    paddingVertical: 25,
    paddingHorizontal: 20,
  },

  detailsTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 18,
  },

  detailsText: {
    color: '#fff',
    fontSize: 17,
    lineHeight: 36,
    textAlign: 'right',
  },
});