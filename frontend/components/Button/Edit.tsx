export function Edit({funcDelete, showProp}: {funcDelete: () => void, showProp: () => void}) {
    return (
        <span className="span-editar">
            <button onClick={funcDelete} className="btn btn-editar btn-excluir">Excluir produto</button>
            <button onClick={showProp} className="btn btn-editar btn-sobre">Editar produto</button>
        </span>
    )
}