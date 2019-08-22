import { baseToken } from '~/services/trade';
// import getQuery from '~/utils/query';

let quoteTokenCategory = [ 'BTC', 'ETH', 'VITE', 'USDT' ];

// const query = getQuery();
// const category = query.category;
// const symbol = query.symbol;
let DefaultCategory = 'BTC';

let state = {
  operatorInfoMap: {},
  currentOperatorInfo: {},
  quoteTokenCategory,
  curentCategory: DefaultCategory,
  marketMap: [],
  marketClosed: []
};

const mutations = {
  setCurentCategory(state, category) {
    state.curentCategory = category;
  },
  setMarketMap(state, marketMap) {
    state.marketMap = marketMap;
  },
  setOperatorInfo(state, operatorInfo) {
    state.operatorInfoMap = operatorInfo;
  },
  setCurrentOperator(state, address) {
    state.currentOperatorInfo = state.operatorInfoMap[address];
  }
};

const actions = {
  updateMarketMap({ commit, dispatch }) {
    // Add quote token
    console.log('store_updateMarketMap');
    baseToken().then(data => {
      const marketMap = data || [];
      commit('setMarketMap', marketMap);

      const tokenIds = [];
      marketMap.forEach(({ tokenId }) => {
        tokenIds.push(tokenId);
      });
      dispatch('addRateTokens', tokenIds);
    });
  }
};

export default { state, mutations, actions };
