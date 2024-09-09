import {store} from "../redux/store";


describe('Redux store configuration', () => {
  it('should configure the store with the correct reducers', () => {
    const state = store.getState();

    expect(state.auth).toBeDefined();
    expect(state.actions).toBeDefined();
  });

});