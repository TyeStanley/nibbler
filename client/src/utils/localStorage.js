export const getFavRestIds = () => {
    const favRestIds = localStorage.getItem('fav_rest')
      ? JSON.parse(localStorage.getItem('fav_rest'))
      : [];
  
    return favRestIds;
  };
  
export const saveFavRestIds = (favRestIds) => {
    if (favRestIds.length) {
      localStorage.setItem('fav_rest', JSON.stringify(favRestIds));
    } else {
      localStorage.removeItem('fav_rest');
    }
  };
  
  export const removeRestId = (restId) => {
    const favRestIds = localStorage.getItem('fav_rest')
      ? JSON.parse(localStorage.getItem('fav_rest'))
      : null;
  
    if (!favRestIds) {
      return false;
    }
  
    const updatedFavRests = favRestIds?.filter((favRestId) => favRestId !== restId);
    localStorage.setItem('fav_rest', JSON.stringify(updatedFavRests));
  
    return true;
  };
  