module.exports = () => {
  const data = {
    vehicles: [],
    departments: [],
    followers: []
  };

  const departments = ['永和耕莘醫院', '恩樺醫院', '輔大診所', '大順醫院', '中英醫院'];

  departments.forEach((department, i) => {
    data.departments.push({
      id: i,
      name: department
    });
  });

  for (let i = 0; i <= 10 ; i++) {
    data.vehicles.push({
      id: i,
      department: data.departments[Math.floor(Math.random()*departments.length)],
    });
  }

  return data;
}
