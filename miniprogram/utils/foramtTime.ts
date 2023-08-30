const formatTime = (data: number) => {
  const hh = Math.floor(data / 3600) < 10 ? '0' + Math.floor(data / 3600) : Math.floor(data / 3600)
  const mm = Math.floor(data % 3600 / 60) < 10 ? '0' + Math.floor(data % 3600 / 60) : Math.floor(data % 3600 / 60)
  const ss = Math.floor(data % 3600 % 60) < 10 ? '0' + Math.floor(data % 3600 % 60) : Math.floor(data % 3600 % 60)
  return (hh == '00' ? '' : (hh + ':')) + mm + ':' + ss
}
export default formatTime