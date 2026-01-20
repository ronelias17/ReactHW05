using LegoBackend.Models;
using System.Collections;

namespace LegoBackend.Repository
{
    public interface ILegoRepository
    {
        LegoSet Add(LegoSet legoSet);
        bool Delete(int id);
        IEnumerable<LegoSet> GetAll();
    }
}
