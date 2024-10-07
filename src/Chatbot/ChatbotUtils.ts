import { toast } from "react-toastify";

type FetchCategoryTreeType = (dispatch: any, categoryId: number) => void;
type SetChatbotOpenType = (isOpen: boolean) => {
  type: string;
  payload: boolean;
};

export const toggleChatbot = (
  dispatch: any,
  categoryId: number,
  chatbotOpen: boolean,
  fetchCategoryTree: FetchCategoryTreeType,
  setChatbotOpen: SetChatbotOpenType
) => {
  if (categoryId >= 1 && categoryId <= 7) {
    fetchCategoryTree(dispatch, categoryId);
    dispatch(setChatbotOpen(!chatbotOpen));
  } else {
    toast.dismiss();
    toast.error(
      "Invalid Category ID entered. Please enter a value between 1 and 7.",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      }
    );
  }
};
