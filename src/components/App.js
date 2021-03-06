import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ajax from '../ajax';
import DealList from './DealList';
import DealDetail from './DealDetail';


class App extends React.Component {
  state = {
    deals: [],
    currentDealId: null,
  }
  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals();
    // console.log(deals)
    this.setState((prevState) => {
      return { deals }
    });
  }
  setCurrentDeal = (dealId) => {
    this.setState((prevState) => ({
      currentDealId: dealId
    }));
  }
  unsetCurrentDeal = (dealId) => {
    this.setState({
      currentDealId: null
    });
  }
  currentDeal = () => {
    return this.state.deals.find(
      (deal) => deal.key === this.state.currentDealId);
  }
  render() {
    if (this.state.currentDealId){
      return (
        <DealDetail
          initialDealData={this.currentDeal()}
          onBack={this.unsetCurrentDeal}
        />
      ); 
    }
    if (this.state.deals.length > 0){
      return <DealList
        deals={this.state.deals}
        onItemPress={this.setCurrentDeal}
      />
    }
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Charity Sale</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
  }
})

export default App;
