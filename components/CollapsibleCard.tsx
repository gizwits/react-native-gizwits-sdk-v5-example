import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CollapsibleCard = ({children, title, right}: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCard = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View>
      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={toggleCard} style={styles.cardTitle}>
          <Text style={styles.cardTitleText}>{title}</Text>
          {right}
          {!isExpanded ? (
            <Icon name="chevron-down" color="#333" />
          ) : (
            <Icon name="chevron-up" color="#333" />
          )}
        </TouchableOpacity>
        {isExpanded && <View style={styles.cardContent}>{children}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    paddingVertical: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitleText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    fontWeight: 'bold',
  },
  cardContent: {
    marginTop: 8,
  },
});

export default CollapsibleCard;
