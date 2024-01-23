export const CaseCard = ({ details }: any) => {
  const {
    title,
    description,
    stolen_location,
    occurred_at,
    updated_at,
    media,
    large_img,
    thumb,
  } = details;
  return (
    <div>
      <div>{title}</div>
      <div>{description}</div>
      <div>{stolen_location}</div>
      <div>{occurred_at}</div>
      <div>{updated_at}</div>
      <div>{media}</div>
      <div>{large_img}</div>
      <div>{thumb}</div>
    </div>
  );
};
