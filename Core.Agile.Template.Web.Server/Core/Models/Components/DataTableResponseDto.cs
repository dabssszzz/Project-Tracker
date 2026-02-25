namespace Core.Agile.Template.Web.Server.Core.Models.Components;

public class DataTableResponseDto<T>
{
    public int RecordsTotal { get; set; }
    public int RecordsFiltered { get; set; }
    public IEnumerable<T> Data { get; set; } = new List<T>();
}
