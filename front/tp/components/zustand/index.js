import create from 'zustand'

const useStore = create(set => ({
    iLikeData: 0,
    iLike: () => set(state => ({ iLikeData: state.iLikeData + 1 })),
    whenRemoveILike: 0,
    removeILike: () => set(state => ({ whenRemoveILike: state.whenRemoveILike + 1 })),
}));

export default useStore;