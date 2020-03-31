var open_set = []
var closed_set = []
var end_point

function calc_heuristics( cur_cell, end_cell )
{
    return abs( end_cell.x - cur_cell.x ) + abs( end_cell.y - cur_cell.y )
}

function a_star( arr )
{
    current_cell = open_set[ 0 ]
    saved_index = 0
    
    for ( let i = 0; i < open_set.length; i++ )
    {
        if ( open_set[ i ].f < current_cell.f )
        {
            current_cell = open_set[ i ]
            saved_index = i
        }
    }
    
    if ( current_cell.x == end_point.x && current_cell.y == end_point.y )
    {
        return current_cell
    }
    
    closed_set.push( current_cell )
    open_set.splice( saved_index, 1 )
    
    var cur_neighbours = current_cell.get_neighbours( arr )
    
    for ( let i = 0; i < cur_neighbours.length; i++ )
    {
        if ( !closed_set.includes( cur_neighbours[ i ] ) )
        {
            var temp_g = current_cell.g + 1;
            
            var new_path = false;
            if ( open_set.includes( cur_neighbours[ i ] ) ) {
                if ( temp_g < cur_neighbours[ i ].g ) {
                    cur_neighbours[ i ].g = temp_g;
                    new_path = true;
                }
            } 
            else
            {
                cur_neighbours[ i ].g = temp_g;
                new_path = true;
                open_set.push( cur_neighbours[ i ] );
            }

            if ( new_path ) {
                cur_neighbours[ i ].h = calc_heuristics( cur_neighbours[ i ], end_point );
                cur_neighbours[ i ].f = cur_neighbours[ i ].g + cur_neighbours[ i ].h;
                cur_neighbours[ i ].previous = current_cell;
            }
        }
    }
    
    return current_cell
}