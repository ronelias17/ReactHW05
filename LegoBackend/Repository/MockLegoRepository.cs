using LegoBackend.Models;

namespace LegoBackend.Repository
{
    public class MockLegoRepository : ILegoRepository
    {
        private static List<LegoSet> legoSets = new List<LegoSet>();
        private static int idCounter = 0;

        public LegoSet Add(LegoSet legoSet)
        {
            idCounter++;
            legoSet.Id = idCounter;

            legoSets.Add(legoSet);
            return legoSet;
        }

        public bool Delete(int id)
        {
            var setDelete = legoSets.FirstOrDefault(l => l.Id == id);

            if (setDelete == null)
            {
                return false;
            }

            legoSets.Remove(setDelete);
            return true;
        }

        public IEnumerable<LegoSet> GetAll()
        {
            return legoSets;
        }
    }
}