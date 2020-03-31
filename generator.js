var stack = []
var current
var count = 1

function backtracking( arr )
{
    if ( count == total_cells )
        return createVector( 0, 0 )
    
    cur = stack.pop( )
    
    neighbours = []
    
    if ( cur.x > 0 )
        if ( !arr[ cur.x - 1 ][ cur.y ].is_visited( ) )
            neighbours.push( createVector( cur.x - 1, cur.y ) )
    
    if ( cur.x < ( width / cell_size ) - 1 )
        if ( !arr[ cur.x + 1 ][ cur.y ].is_visited( ) )
            neighbours.push( createVector( cur.x + 1, cur.y ) )
    
    if ( cur.y > 0 )
        if ( !arr[ cur.x ][ cur.y - 1 ].is_visited( ) )
            neighbours.push( createVector( cur.x, cur.y - 1 ) )
        
    if ( cur.y < ( height / cell_size ) - 1 )
        if ( !arr[ cur.x ][ cur.y + 1 ].is_visited( ) )
            neighbours.push( createVector( cur.x, cur.y + 1 ) )
    
    if ( neighbours.length )
    {
        stack.push( cur )
        
        selected = neighbours[ floor( random( neighbours.length ) ) ]
        stack.push( selected )
        
        arr[ cur.x ][ cur.y ].remove_wall( selected.x - cur.x, selected.y - cur.y )
        arr[ selected.x ][ selected.y ].remove_wall( cur.x - selected.x, cur.y - selected.y )
        
        arr[ selected.x ][ selected.y ].set_visited( )
        count++
        
        return selected
    }
    
    return cur
}