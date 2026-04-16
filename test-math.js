const TEAM_LENGTH = 11;
let elements = [];
// if we render TEAM_LENGTH + 1 items:
for(let i=0; i < TEAM_LENGTH + 1; i++) {
   const slotIdx = i - 1;
   elements.push(slotIdx);
}
console.log("slotIdxs:", elements);
