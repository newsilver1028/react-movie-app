import { AddBookMarkModalProps } from "../../types/movieTypes";

export default function AddBookmarkModal(props: AddBookMarkModalProps) {
  const { clickedMovieId, setIsOpenBookMarkModal, handleIsMarkedClick } = props;

  const handleModalOutsideClick = () => {
    setIsOpenBookMarkModal(false);
  };

  // const handleIsMarkedClick = () => {
  //   console.log({ clickIsMarked: clickedMovieId });
  // };
  return (
    <div>
      {/* background */}
      <div onClick={handleModalOutsideClick}>
        {/* isMarked에 따라 즐겨찾기 추가 | 제거
         * isMarked button을 클릭해도 모달창이 닫힘 ㅠㅜㅠ
         */}
        <button type="button" onClick={handleIsMarkedClick}>
          isMarked
        </button>
        <button type="button">cancel</button>
        <div>{clickedMovieId}</div>
      </div>
    </div>
  );
}
